import { useQuery } from '@apollo/client';
import { ALL_VENUES } from '../graphql/queries';

const useVenues = () => {
  const { data, error, loading } = useQuery(ALL_VENUES);

  return {
    buildings: data ? data.allVenues : [],
    loading,
    error,
  };
};

export default useVenues;
