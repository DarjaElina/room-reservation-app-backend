import { useQuery } from '@apollo/client';
import { ALL_VENUES } from '@/src/graphql/queries';
import { AllVenuesQueryVariables } from '@/__generated__/graphql';


const useVenues = (variables: AllVenuesQueryVariables) => {
  const { data, error, loading } = useQuery(ALL_VENUES, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  return {
    buildings: data ? data.allVenues : [],
    loading,
    error,
  };
};

export default useVenues;
