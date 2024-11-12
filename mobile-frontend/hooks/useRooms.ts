import { useQuery } from '@apollo/client';
import { ALL_ROOMS } from '../graphql/queries';

const useRooms = (variables) => {
  const { data, error, loading, fetchMore, ...result } = useQuery(ALL_ROOMS, {
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
    rooms: data ? data.rooms : [],
    fetchMore: handleFetchMore,
    loading,
    error,
  };
};

export default useRooms;
