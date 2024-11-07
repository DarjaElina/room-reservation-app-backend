import { useQuery } from '@apollo/client';
import { BOOKINGS_BY_ROOM_AND_USER } from '../graphql/queries';
import { BookingStatus } from '../__generated__/graphql';

const useBookings = (
  roomId: string,
  userId: string,
  status?: BookingStatus
) => {
  const { data, error, loading } = useQuery(BOOKINGS_BY_ROOM_AND_USER, {
    variables: { roomId, userId, status },
  });

  return {
    bookings: data ? data.bookingsByRoomAndUser : [],
    loading,
    error,
  };
};
export default useBookings;
