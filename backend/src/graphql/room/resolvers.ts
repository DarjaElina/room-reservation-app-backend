import { Resolvers } from '../generated-types';
import Room from '../../models/room';
import { handleResolverErrors } from '../../util/errorHandler';
import { GraphQLError } from 'graphql';
import User from '../../models/user';
import Venue from '../../models/venue';
import Booking from '../../models/booking';
import { Op } from 'sequelize';
import Equipment from '../../models/equipment';

const roomResolvers: Resolvers = {
  Query: {
    allRooms: async (_, { isBookable }, { user }: { user: User }) => {
      if (!user) {
        throw new GraphQLError('Unauthenticated');
      }
      try {
        const rooms = await Room.findAll({
          where: isBookable !== undefined ? { isBookable } : {},
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

        const currentDateTime = new Date();
        const roomIds = rooms.map((room) => room.id);
        const currentBookings = await Booking.findAll({
          where: {
            roomId: { [Op.in]: roomIds },
            startDate: { [Op.lte]: currentDateTime },
            endDate: { [Op.gte]: currentDateTime },
          },
        });

        const roomsWithStatus = rooms.map((room) => {
          const isFree = !currentBookings.some(
            (booking) => booking.roomId === room.id
          );
          return {
            ...room.dataValues,
            venue: room.venue,
            isFree,
            equipment: room.equipment,
          };
        });

        return roomsWithStatus;
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
