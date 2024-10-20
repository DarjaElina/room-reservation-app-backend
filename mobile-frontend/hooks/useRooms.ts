import { useQuery } from '@apollo/client';
import { ALL_ROOMS } from '../graphql/queries';

const useRooms = () => {
  const { data, error, loading } = useQuery(ALL_ROOMS);

  return {
    rooms: data ? data.allRooms : [],
    loading,
    error,
  };
};

export default useRooms;
