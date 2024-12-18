import { useQuery } from '@apollo/client';
import { ALL_EQUIPMENT } from '@/src/graphql/queries';
import { AllEquipmentQueryVariables } from '@/__generated__/graphql';

const useEquipment = (variables: AllEquipmentQueryVariables) => {
  const { data, error, loading } = useQuery(ALL_EQUIPMENT, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  return {
    equipment: data ? data.allEquipment : [],
    loading,
    error,
  };
};

export default useEquipment;
