import { Resolvers, User, BookingStatus } from '../generated-types';
import Booking from '../../models/booking';
import Room from '../../models/room';
import { GraphQLError } from 'graphql';
import { handleResolverErrors } from '../../util/errorHandler';
import {
  validateSingleBooking,
  getTotalBookedHoursForWeek,
  checkBookingLimit,
  checkRoomDepartmentRestriction,
} from '../../helpers/helpers';
import { Op, WhereOptions } from 'sequelize';
import { z } from 'zod';
import UserModel from '../../models/user';
import { sequelize } from '../../util/db';

const argsSchema = z.object({
  roomId: z.string().optional(),
  userId: z.string().optional(),
  status: z.nativeEnum(BookingStatus).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

const argsCreationSchema = z.object({
  roomId: z.string(),
  bookingTime: z.tuple([z.date(), z.date()]),
  title: z.string().optional(),
});

const argsModificationSchema = z.object({
  bookingTime: z.tuple([z.date(), z.date()]),
  title: z.string().optional(),
  bookingId: z.string(),
});

const bookingResolvers: Resolvers = {
  Query: {
    bookings: async (_, args, { user }: { user: User }) => {
      if (!user)
        throw new GraphQLError('User is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          }
      });

      try {
        const normalizedArgs = argsSchema.parse(args);
        const { roomId, userId, status, startDate, endDate } = normalizedArgs;

        const where: WhereOptions = {};

        if (roomId) {
          where.roomId = roomId;
        }

        if (userId) {
          where.userId = userId;
        }

        if (status) {
          where.status = status;
        }

        if (startDate && endDate) {
          where.bookingTime = {
            [Op.overlap]: [startDate, endDate],
          };
        }

        const bookings = await Booking.findAll({
          include: [
            {
              model: Room,
              attributes: ['id', 'code'],
            },
            {
              model: UserModel,
            },
          ],
          where,
        });

        return bookings;
      } catch (error) {
        return handleResolverErrors(error);
      }
    },
  },

  Booking: {
    room: (booking) => {
      return booking.room;
    },
    user: (booking) => {
      return booking.user;
    },
  },

  Mutation: {
    createBooking: async (_, args, { user }: { user: User }) => {
      if (!user)
        throw new GraphQLError('User is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          }
      });

      const normalizedArgs = argsCreationSchema.parse(args);
      const { roomId, bookingTime, title } = normalizedArgs;
      const bookingTimeForDb = [
        {
          value: bookingTime[0],
          inclusive: true,
        },
        {
          value: bookingTime[1],
          inclusive: false,
        },
      ];
      return await sequelize.transaction(async (transaction) => {
        validateSingleBooking(user.role, bookingTime[0], bookingTime[1]);

        const totalBookedHours = await getTotalBookedHoursForWeek(
          user.id,
          transaction
        );

        const newBookingHours =
          (bookingTime[0].getTime() - bookingTime[1].getTime()) /
          (1000 * 60 * 60);
        checkBookingLimit(user.role, totalBookedHours, newBookingHours);

        await checkRoomDepartmentRestriction(user, roomId, transaction);

        const room = await Room.findByPk(roomId, { transaction });
        if (!room) {
          throw new GraphQLError('Room not found!');
        }

        const booking = await Booking.create(
          {
            userId: user.id,
            roomId,
            bookingTime: bookingTimeForDb,
            status: BookingStatus.Active,
            title,
          },
          { transaction }
        );

        return { ...booking.dataValues, room, user };
      });
    },

    updateBooking: async (_, args, { user }: { user: User }) => {
      if (!user)
        throw new GraphQLError('User is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          }
      });

      const normalizedArgs = argsModificationSchema.parse(args);
      const { bookingTime, title, bookingId } = normalizedArgs;

      return await sequelize.transaction(async (transaction) => {
        const booking = await Booking.findByPk(bookingId, { transaction });
        if (!booking) {
          throw new GraphQLError('Booking does not exist');
        }
        if (booking.userId !== user.id) {
          throw new GraphQLError('You can update only your own bookings');
        }

        validateSingleBooking(user.role, bookingTime[0], bookingTime[1]);

        const totalBookedHours = await getTotalBookedHoursForWeek(
          user.id,
          transaction
        );

        const newBookingHours =
          (bookingTime[0].getTime() - bookingTime[1].getTime()) /
          (1000 * 60 * 60);

        checkBookingLimit(user.role, totalBookedHours, newBookingHours);

        const bookingTimeForDb = [
          {
            value: bookingTime[0],
            inclusive: true,
          },
          {
            value: bookingTime[1],
            inclusive: false,
          },
        ];

        const updatedBooking = await booking.update(
          { bookingTime: bookingTimeForDb, title },
          { transaction }
        );

        return updatedBooking;
      });
    },

    cancelBooking: async (_, { bookingId }, { user }: { user: User }) => {
      if (!user)
        throw new GraphQLError('User is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          }
      });

      try {
        const booking = await Booking.findByPk(bookingId);
        if (!booking) {
          throw new GraphQLError('Booking does not exist');
        }
        if (booking.userId !== user.id) {
          throw new GraphQLError('You can delete only your own bookings');
        }
        const timeBeforeStartDate =
          Date.now() - booking.bookingTime[0].value.getDate();
        if (Math.floor(timeBeforeStartDate / 60000) >= 30) {
          await booking.update({ status: BookingStatus.CancelledLate });
        }
        await booking.update({ status: BookingStatus.Cancelled });
        return { success: true, message: 'Booking canceled', id: booking.id };
      } catch (error) {
        return handleResolverErrors(error);
      }
    },
  },
};

export default bookingResolvers;
