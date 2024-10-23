import { useQuery } from '@apollo/client';
import { BOOKINGS_BY_ROOM_AND_USER } from '../graphql/queries';

const useBookings = (roomId: string, userId: string) => {
  const { data, error, loading } = useQuery(BOOKINGS_BY_ROOM_AND_USER, {
    variables: { roomId, userId },
  });
  console.log(data);

  return {
    bookings: data ? data.bookingsByRoomAndUser : [],
    loading,
    error,
  };
};

export default useBookings;
