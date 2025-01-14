import { useQuery } from '@apollo/client';
import { ALL_ROOMS } from '@/src/graphql/queries';
import {
  RoomsQueryVariables,
  RoomConnection,
  Room,
} from '@/__generated__/graphql';

const useRooms = (variables: RoomsQueryVariables) => {
  const { data, error, loading, fetchMore } = useQuery(ALL_ROOMS, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.rooms.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.rooms.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    rooms: data ? data.rooms : { edges: [] },
    fetchMore: handleFetchMore,
    loading,
    error,
  };
};

export default useRooms;
