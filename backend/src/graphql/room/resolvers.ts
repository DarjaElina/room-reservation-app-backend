import { Resolvers } from '../generated-types';
import Room from '../../models/room';
import { handleResolverErrors } from '../../util/errorHandler';
import { GraphQLError } from 'graphql';
import User from '../../models/user';
import Venue from '../../models/venue';
import Booking from '../../models/booking';
import { Op, WhereOptions } from 'sequelize';
import Equipment from '../../models/equipment';
import { z } from 'zod';
import { RoomType } from '../../types/room/room.enums';
import { makePaginate } from 'sequelize-cursor-pagination';

const argsSchema = z.object({
  startsAt: z.date().refine(date => date > new Date(), {
    message: "Start date must be in the future",
  }).optional(),
  endsAt: z.date().refine(date => date > new Date(), {
    message: "End date must be in the future",
  }).optional(),
  venueId: z.string().optional(),
  roomType: z.nativeEnum(RoomType).optional(),
  accessoiresIds: z.array(z.string()).optional(),
  isBookable: z.boolean().optional(),
  searchKeyword: z.string().optional(),
  after: z.string().optional(),
  first: z
    .number()
    .min(1)
    .max(30)
    .default(30)
    .optional(),
});

Room.paginate = makePaginate(Room);

const roomResolvers: Resolvers = {
  Query: {
    rooms: async (_, args, { user }: { user: User }) => {
      if (!user) {
        throw new GraphQLError('Unauthenticated');
      }

      
      try {
        const normalizedArgs = argsSchema.parse(args);
        const {
          startsAt,
          endsAt,
          venueId,
          roomType,
          accessoiresIds,
          isBookable,
          searchKeyword,
          after,
          first,
        } = normalizedArgs;

        const where: WhereOptions = {};

        console.log('normalized args', normalizedArgs)
        console.log('search keyword from backend', searchKeyword);

        if (venueId) {
          where.venueId = venueId;
        }

        if (roomType) {
          where.roomType = roomType;
        }

        if (isBookable !== undefined) {
          where.isBookable = isBookable;
        }

        if (accessoiresIds && accessoiresIds.length > 0) {
          where.accessoiresIds = { [Op.in]: accessoiresIds };
        }

        if (searchKeyword) {
          where.code = { [Op.iLike]: `%${searchKeyword}%` };
        }

        const conflictingBookings = await Booking.findAll({
          attributes: ['roomId'],
          where: {
            startDate: { [Op.lte]: endsAt },
            endDate: { [Op.gte]: startsAt },
          },
        });

        const conflictingRoomIds = conflictingBookings.map(b => b.roomId);

        where.id = { [Op.notIn]: conflictingRoomIds };

        const queryOptions = {
          limit: first,
          after,
          where,
          include: [
            {
              model: Venue,
            },
          ],
        };
    
        const rooms = await Room.paginate(queryOptions);
    
        return rooms;
      } catch (error) {
        return handleResolverErrors(error);
      }
    },

    findRoom: async (_, { roomId }, { user }) => {
      try {
        if (!user) {
          throw new GraphQLError('Unauthenticated');
        }
        const room = await Room.findByPk(roomId, {
          include: [
            {
              model: Venue,
              include: [],
            },
            {
              model: Equipment,
              attributes: ['name'],
              through: {
                attributes: [],
              },
            },
          ],
        });
        if (!room) {
          throw new GraphQLError('Not found!');
        }
        const currentDateTime = new Date();
        const currentBooking = await Booking.findOne({
          where: {
            roomId: room.id,
            startDate: { [Op.lte]: currentDateTime },
            endDate: { [Op.gte]: currentDateTime },
          },
        });
        return {
          ...room.dataValues,
          isFree: !currentBooking,
          venue: room.venue,
        };
      } catch (error) {
        return handleResolverErrors(error);
      }
    },
  },

  Room: {
    venue: (room) => {
      return room.venue;
    },
    equipment: (room) => {
      return room.equipment || [];
    },
  },
};

export default roomResolvers;



