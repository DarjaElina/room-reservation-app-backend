import { BookingStatus } from '../types/booking/booking.enums';

export const isBookingStatus = (status: unknown): status is BookingStatus => {
  return Object.values(BookingStatus).includes(status as BookingStatus);
};