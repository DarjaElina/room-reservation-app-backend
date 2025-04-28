import { BookingTimeItem } from "../../src/models/booking";

export const getNextBookingTimeRange = (startHour = 14, duration = 1) => {
  const currentDate = new Date();

  currentDate.setDate(currentDate.getDate() + 1);

  const startBookingTime = new Date(currentDate);
  startBookingTime.setHours(startHour, 0, 0, 0);

  const endBookingTime = new Date(currentDate);
  endBookingTime.setHours(startHour + duration, 0, 0, 0);

  return [startBookingTime.getTime(), endBookingTime.getTime()];
};

export const getBookingTimeForDb = (bookingTime: number[]):  BookingTimeItem[] => {
  return [
    {
      value: new Date(bookingTime[0]),
      inclusive: true,
    },
    {
      value: new Date(bookingTime[1]),
      inclusive: false,
    },
  ];
};