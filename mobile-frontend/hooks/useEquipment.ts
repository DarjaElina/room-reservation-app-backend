import { useQuery } from '@apollo/client';
import { ALL_EQUIPMENT } from '../graphql/queries';

const useEquipment = () => {
  const { data, error, loading } = useQuery(ALL_EQUIPMENT);

  return {
    equipment: data ? data.allEquipment : [],
    loading,
    error,
  };
};

export default useEquipment;
