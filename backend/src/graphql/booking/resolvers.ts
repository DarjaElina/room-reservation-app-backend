import { Resolvers, User, BookingStatus } from '../generated-types';
import Booking from '../../models/booking';
import Room from '../../models/room';
import { GraphQLError } from 'graphql';
import { handleResolverErrors } from '../../util/errorHandler';
import {
  validateSingleBooking,
  checkOverlappingBookings,
  getTotalBookedHoursForWeek,
  checkBookingLimit,
  checkRoomDepartmentRestriction,
} from '../../helpers/helpers';
import { Op, WhereOptions } from 'sequelize';
import { z } from 'zod';

const argsSchema = z.object({
  roomId: z.string().optional(),
  userId: z.string().optional(),
  status: z.nativeEnum(BookingStatus).optional(),
  startDate: z
    .date()
    .optional(),
  endDate: z
    .date()
    .optional(),
});

const bookingResolvers: Resolvers = {
  Query: {
    bookings: async (_, args, { user }: { user: User }) => {
      if (!user) {
        throw new GraphQLError('Unauthenticated');
      }

      try {
        const normalizedArgs = argsSchema.parse(args);
        const {
          roomId,
          userId,
          status,
          startDate,
          endDate
        } = normalizedArgs;

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
          where.startDate = { [Op.lt]: endDate };
          where.endDate = { [Op.gt]: startDate };
        }

        const bookings = await Booking.findAll({
          include: [
            {
              model: Room,
              attributes: ['id', 'name', 'description'],
            },
          ],
          where
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
    createBooking: async (
      _,
      { roomId, startDate, endDate },
      { user }: { user: User }
    ) => {
      if (!user) {
        throw new GraphQLError('Not authenticated');
      }
      validateSingleBooking(user.role, startDate, endDate);
      await checkOverlappingBookings(roomId, startDate, endDate);

      const totalBookedHours = await getTotalBookedHoursForWeek(user.id);

      const newBookingHours =
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);

      checkBookingLimit(user.role, totalBookedHours, newBookingHours);

      await checkRoomDepartmentRestriction(user, roomId);

      const room = await Room.findByPk(roomId);

      if (!room) {
        throw new GraphQLError('Room not found!');
      }

      try {
        const booking = await Booking.create({
          userId: user.id,
          roomId,
          startDate,
          endDate,
          status: BookingStatus.Active,
        });
        return { ...booking, room };
      } catch (error) {
        return handleResolverErrors(error);
      }
    },

    updateBooking: async (
      _,
      { bookingId, startDate, endDate },
      { user }: { user: User }
    ) => {
      if (!user) {
        throw new GraphQLError('Not authenticated');
      }

      try {
        const booking = await Booking.findByPk(bookingId);
        if (!booking) {
          throw new GraphQLError('Booking does not exist');
        }
        if (booking.userId !== user.id) {
          throw new GraphQLError('You can update only your own bookings');
        }
        await checkOverlappingBookings(booking.roomId, startDate, endDate);
        await booking.update({ startDate, endDate });
        return booking;
      } catch (error) {
        return handleResolverErrors(error);
      }
    },

    cancelBooking: async (_, { bookingId }, { user }: { user: User }) => {
      if (!user) {
        throw new GraphQLError('Not authenticated');
      }

      try {
        const booking = await Booking.findByPk(bookingId);
        if (!booking) {
          throw new GraphQLError('Booking does not exist');
        }
        if (booking.userId !== user.id) {
          throw new GraphQLError('You can delete only your own bookings');
        }
        const timeBeforeStartDate = Date.now() - booking.startDate.getDate();
        if (Math.floor(timeBeforeStartDate / 60000) >= 30) {
          await booking.update({ status: BookingStatus.CancelledLate });
        }
        await booking.update({ status: BookingStatus.Cancelled });
        return { success: true, message: 'Booking canceled' };
      } catch (error) {
        return handleResolverErrors(error);
      }
    },
  },
};

export default bookingResolvers;
