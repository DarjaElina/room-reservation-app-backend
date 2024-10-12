import cron from 'node-cron';
import Booking from '../models/booking';
import { Op } from 'sequelize';
import { BookingStatus } from '../graphql/generated-types';

const updateBookingStatuses = async () => {
  try {
    const now = new Date();
    const [updatedCount] = await Booking.update(
      { status: BookingStatus.Past },
      {
        where: {
          status: BookingStatus.Active,
          endDate: { [Op.lt]: now }
        }
      }
    );
    console.log(`${updatedCount} bookings updated to 'Past' status`);
  } catch (error) {
    console.error('Error updating bookings:', error);
  }
};

const deleteOldBookings = async () => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const deletedCount = await Booking.destroy({
      where: {
        status: BookingStatus.Past,
        endDate: { [Op.lt]: oneWeekAgo }
      }
    });

    console.log(`${deletedCount} old bookings deleted`);
  } catch (error) {
    console.error('Error deleting old bookings:', error);
  }
};

export const startCronJobs = () => {
  cron.schedule('0 0 * * *', () => {
    updateBookingStatuses().catch((error) => {
      console.error('Cron job failed (update bookings):', error);
    });
  });

  cron.schedule('0 0 * * *', () => {
    deleteOldBookings().catch((error) => {
      console.error('Cron job failed (delete old bookings):', error);
    });
  });
};
