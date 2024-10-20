import { Resolvers } from "../generated-types";
import Room from "../../models/room";
import { handleResolverErrors } from "../../util/errorHandler";
import { GraphQLError } from "graphql";
import User from "../../models/user";
import Venue from "../../models/venue";
import Booking from "../../models/booking";
import { Op } from "sequelize";

const roomResolvers: Resolvers = {
  Query: {
    allRooms: async (_, { isBookable }, { user }: { user: User }) => {
      if (!user) {
        throw new GraphQLError('Unauthenticated');
      }
      try {
        const rooms = await Room.findAll({
          where: isBookable !== undefined ? { isBookable } : {},
          include: [{
            model: Venue,
            include: []
          }]
        });

        const currentDateTime = new Date();
        const roomsWithStatus = await Promise.all(
          rooms.map(async (room) => {
            const currentBooking = await Booking.findOne({
              where: {
                roomId: room.id,
                startDate: { [Op.lte]: currentDateTime },
                endDate: { [Op.gte]: currentDateTime },
              },
            });
            return {
              ...room.dataValues,
              venue: room.venue,
              isFree: !currentBooking,
            };
          })
        );

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
          include: [{
            model: Venue,
            include: []
          }]
        });
        if (!room) {
          throw new GraphQLError('Not found!');
        }
        return room;
      } catch (error) {
        return handleResolverErrors(error);
      }
    }
  },

  Room: {
    venue: (room) => {
      return room.venue;
    }
  }
};

export default roomResolvers;