import { useQuery } from '@apollo/client';
import { BOOKINGS } from '@/src/graphql/queries';
import { BookingsQueryVariables } from '@/__generated__/graphql';

const useBookings = (variables: BookingsQueryVariables) => {
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
