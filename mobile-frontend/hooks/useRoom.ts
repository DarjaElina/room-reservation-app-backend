import { useQuery } from '@apollo/client';
import { FIND_ROOM } from '../graphql/queries';

const useRoom = (roomId: string) => {
  const { data, error, loading } = useQuery(FIND_ROOM, {
    variables: { roomId },
  });

  console.log(data);

  return {
    room: data ? data.findRoom : null,
    loading,
    error,
  };
};

export default useRoom;
