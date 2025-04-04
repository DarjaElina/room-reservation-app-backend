export const getNextBookingTimeRange = () => {
  const currentDate = new Date();

  currentDate.setDate(currentDate.getDate() + 1);

  const startBookingTime = new Date(currentDate);
  startBookingTime.setHours(14, 0, 0, 0);

  const endBookingTime = new Date(currentDate);
  endBookingTime.setHours(15, 0, 0, 0);

  return [startBookingTime.getTime(), endBookingTime.getTime()];
};
