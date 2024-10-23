import { Resolvers, User, BookingStatus } from "../generated-types";
import Booking from "../../models/booking";
import Room from "../../models/room";
import { GraphQLError } from "graphql";
import { handleResolverErrors } from "../../util/errorHandler";
import { validateSingleBooking, checkOverlappingBookings, getTotalBookedHoursForWeek, checkBookingLimit, checkRoomDepartmentRestriction } from "../../helpers/helpers";



// for booking creation
// students can book room for 12 hours/week
// teachers for 30 hours/week
// teachers can book rooms month ahead
// students two day ahead
// practice_room as well as classrooms are available for all students unless classroom belongs to specific department
// concert_hall, administrative spaces, meeting_rooms, theater, studio are only for teachers and managers to book
// concert halls can be booked for upcoming semester for exams and performances by managers

// booking can not be updated if less than 15 min left before it starts
// booking can be cancelled, but if ist less than 30 min before start, it will be marked
// as cancelled_late and will eat the time anyway
// student can book one room for 3 hours maximum, teachers for 8 hours maximum, managers unlimited


const bookingResolvers: Resolvers = {
  Query: {
    allBookings: async (_, __, { user }: { user: User }) => {
      if (!user) {
        throw new GraphQLError('Not authenticated');
      }
      const bookings = await Booking.findAll({
        include: [{
          model: Room,
          include: []
        }]
      });
      
      return bookings;
    },

    bookingsByRoom: async (_, { roomId }, { user }: { user: User }) => {
      if (!user) {
        throw new GraphQLError('Not authenticated');
      }
      const bookings = await Booking.findAll({ where: { roomId }});

      return bookings;
    },

    bookingsByDateRange: async (_, { startDate, endDate }, { user }: { user: User }) => {
      if (!user) {
        throw new GraphQLError('Not authenticated');
      }
      const bookings = await Booking.findAll({ where: { startDate, endDate }});

      return bookings;
    },

    bookingsByUser: async (_, { userId }, { user }: { user: User }) => {
      if (!user) {
        throw new GraphQLError('Not authenticated');
      }
      const bookings = await Booking.findAll({ where: { userId }});

      return bookings;
    },
    bookingsByRoomAndUser: async (_, { userId, roomId }, { user }: { user: User}) => {
      if (!user) {
        throw new GraphQLError('Not authenticated');
      }
      const bookings = await Booking.findAll({ where: { userId, roomId }});

      return bookings;
    }
  },

  Booking: {
    room: (booking) => {
      return booking.room;
    },
    user: (booking) => {
      return booking.user;
    }
  },

  Mutation: {
    createBooking: async (_, { roomId, startDate, endDate }, { user }: { user: User }) => {
      if (!user) {
        throw new GraphQLError('Not authenticated');
      }
      validateSingleBooking(user.role, startDate, endDate);
      await checkOverlappingBookings(roomId, startDate, endDate);

      const totalBookedHours = await getTotalBookedHoursForWeek(user.id);

      const newBookingHours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);

      checkBookingLimit(user.role, totalBookedHours, newBookingHours);

      await checkRoomDepartmentRestriction(user, roomId);

      try {
        const booking = await Booking.create({ userId: user.id, roomId, startDate, endDate, status: BookingStatus.Active });
        return booking;
      } catch (error) {
        return handleResolverErrors(error);
      }
    },

    updateBooking: async (_, { bookingId, startDate, endDate }, { user }: { user: User }) => {
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
    }
  }

};

export default bookingResolvers;