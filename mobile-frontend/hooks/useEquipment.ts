import { useQuery } from '@apollo/client';
import { ALL_EQUIPMENT } from '../graphql/queries';

const useEquipment = (variables) => {
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
