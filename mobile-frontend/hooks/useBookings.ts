import { useQuery } from '@apollo/client';
import { BOOKINGS } from '../graphql/queries';

const useBookings = (variables) => {
  const { data, error, loading } = useQuery(BOOKINGS, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  return {
    bookings: data ? data.bookings : [],
    loading,
    error,
  };
};
export default useBookings;
