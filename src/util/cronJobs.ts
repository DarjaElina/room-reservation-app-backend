import cron from 'node-cron';
import Booking from '../models/booking';
import { Op, WhereAttributeHashValue } from 'sequelize';
import { BookingStatus, BookingTimeItem } from '../graphql/generated-types';

const updateBookingStatuses = async () => {
  try {
    const now = new Date();
    await Booking.update(
      { status: BookingStatus.Past },
      {
        where: {
          status: BookingStatus.Active,
          bookingTime: {
            [Op.noExtendRight]: [null, now],
          } as WhereAttributeHashValue<BookingTimeItem[]>,
        },
      }
    );
  } catch (error) {
    console.error('Error updating bookings:', error);
  }
};

const deleteOldBookings = async () => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    await Booking.destroy({
      where: {
        status: BookingStatus.Past,
        bookingTime: {
          [Op.noExtendRight]: [null, oneWeekAgo],
        } as WhereAttributeHashValue<BookingTimeItem[]>,
      },
    });
  } catch (error) {
    console.error('Error deleting old bookings:', error);
  }
};

export const startCronJobs = () => {
  cron.schedule('0 * * * *', () => {
    updateBookingStatuses().catch((error) => {
      console.error('Cron job failed (update bookings):', error);
    });
  });

  cron.schedule('0 0 * * 0', () => {
    deleteOldBookings().catch((error) => {
      console.error('Cron job failed (delete old bookings):', error);
    });
  });
};
