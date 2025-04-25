import { Resolvers } from '../generated-types';
import Room from '../../models/room';
import { handleResolverErrors } from '../../util/errorHandler';
import { GraphQLError } from 'graphql';
import User from '../../models/user';
import Venue from '../../models/venue';
import Booking from '../../models/booking';
import FavoriteRoom from '../../models/favorite_rooms';
import { Op, WhereOptions } from 'sequelize';
import Equipment from '../../models/equipment';
import { z } from 'zod';
import { RoomType } from '../../types/room/room.enums';
import { makePaginate } from 'sequelize-cursor-pagination';
import { BookingAttributes } from '../../models/booking';
import { BookingStatus } from '../../types/booking/booking.enums';

type RoomWithIsFree = Room & { isFree?: boolean };

const argsSchema = z.object({
  startsAt: z
    .date()
    .refine((date) => date > new Date(), {
      message: 'Start date must be in the future',
    })
    .optional(),
  endsAt: z
    .date()
    .refine((date) => date > new Date(), {
      message: 'End date must be in the future',
    })
    .optional(),
  venueIds: z.array(z.string()).optional(),
  roomTypes: z.array(z.nativeEnum(RoomType)).optional(),
  equipmentIds: z.array(z.string()).optional(),
  isBookable: z.boolean().optional(),
  searchKeyword: z.string().optional(),
  after: z.string().optional(),
  first: z.number().min(1).max(30).default(30).optional(),
  showFavorites: z.boolean().optional(),
});

Room.paginate = makePaginate(Room);

const roomResolvers: Resolvers = {
  Query: {
    rooms: async (_, args, { user }: { user: User }) => {
      if (!user)
        throw new GraphQLError('User is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          }
      });

      try {
        const normalizedArgs = argsSchema.parse(args);
        const {
          startsAt,
          endsAt,
          venueIds,
          roomTypes,
          equipmentIds,
          isBookable,
          searchKeyword,
          after,
          first,
          showFavorites
        } = normalizedArgs;

        const where: WhereOptions = {};

        if (venueIds && venueIds.length > 0) {
          where.venueId = { [Op.in]: venueIds };
        }

        if (roomTypes && roomTypes.length > 0) {
          where.type = { [Op.in]: roomTypes };
        }

        if (isBookable !== undefined) {
          where.isBookable = isBookable;
        }

        if (searchKeyword) {
          where.code = { [Op.iLike]: `%${searchKeyword}%` };
        }

        const favoriteRooms = await FavoriteRoom.findAll({
          where: {
            userId: user.id
          }
        });

        if (showFavorites) {
          where.id = { [Op.in]: favoriteRooms.map(r => r.dataValues.roomId) };
        }

        let conflictingRoomIds: string[] = [];
        if (startsAt && endsAt) {
          const conflictingBookings = await Booking.findAll({
            attributes: ['roomId'],
            where: {
              bookingTime: {
                [Op.overlap]: [startsAt, endsAt],
              },
            },
          });

          conflictingRoomIds = conflictingBookings.map((b) => b.roomId);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          where.id = where.id ? { ...where.id, [Op.notIn]: conflictingRoomIds } : { [Op.notIn]: conflictingRoomIds };
        }
        
        const currentBookings = await Booking.findAll({
          attributes: ['roomId'],
          where: {
            bookingTime: {
              [Op.contains]: new Date(),
            },
            status: BookingStatus.Active
          } as WhereOptions<BookingAttributes> | undefined,
        });
        const currentRoomIds = currentBookings.map((b) => b.roomId);

        const queryOptions = {
          order: ['code'],
          limit: first,
          after,
          where,
          include: [
            {
              model: Venue,
            },
            {
              model: Equipment,
              where:
                equipmentIds && equipmentIds.length > 0
                  ? { id: { [Op.in]: equipmentIds } }
                  : undefined,
              through: { attributes: ['id'] },
            },
          ],
        };

        const rooms = await Room.paginate(queryOptions);
        rooms.edges.forEach((e) => {
          const node = e.node as RoomWithIsFree;
          node.isFree = !currentRoomIds.includes(node.id);
        });

        return rooms;
      } catch (error) {
        console.log(error);
        return handleResolverErrors(error);
      }
    },

    findRoom: async (_, { roomId }, { user }: {user: User}) => {
        if (!user)
          throw new GraphQLError('User is not authenticated', {
            extensions: {
              code: 'UNAUTHENTICATED',
              http: { status: 401 },
            }
        });
        try {
        const room = await Room.findByPk(roomId, {
          include: [
            {
              model: Venue,
              include: [],
            },
            {
              model: Equipment,
              attributes: ['name', 'id'],
              through: {
                attributes: [],
              },
            },
          ],
        });
        if (!room) {
          throw new GraphQLError('Room not found', {
            extensions: {
              code: 'BAD_USER_INPUT',
            },
          });
        }
        const favoriteRoom = await FavoriteRoom.findOne({
          where: {
            roomId: room.id,
            userId: user.id
          }
        });
        const currentBooking = await Booking.findOne({
          where: {
            roomId: room.id,
            bookingTime: {
              [Op.contains]: new Date(),
            },
          } as WhereOptions<BookingAttributes> | undefined,
        });
        return {
          ...room.dataValues,
          isFree: !currentBooking,
          isFavorite: !!favoriteRoom,
          venue: room.venue,
          equipment: room.equipment,
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

  Mutation: {
    toggleFavorite: async (_, { roomId }: { roomId: string }, { user }: { user: User}) => {
      if (!user)
        throw new GraphQLError('User is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          }
      });
      try {
        const room = await Room.findByPk(roomId);
        if (!room) {
          throw new GraphQLError('Room not found');
        }
        
        const favoriteRoom = await FavoriteRoom.findOne({where: {roomId, userId: user.id}});

        if (!favoriteRoom) {
          await FavoriteRoom.create({userId: user.id, roomId});
          return {
            success: true,
            message: `Room ${room.code} successfully added to favorite 🧡`,
            isFavoriteNow: true,
            id: room.id
          };
        }

        else {
          await favoriteRoom.destroy();
          return {
            success: true,
            isFavoriteNow: false,
            message: `Room ${room.code} successfully deleted from favorite.`,
            id: room.id,
          };
        }
        
      } catch (error) {
        console.log(error);
        return handleResolverErrors(error);
      }
    },
  }
};

export default roomResolvers;
