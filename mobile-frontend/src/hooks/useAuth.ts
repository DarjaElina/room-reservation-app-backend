import { useQuery } from '@apollo/client';
import { CURRENT_USER } from '@/src/graphql/queries';

const useAuth = () => {
  const { data, error, loading } = useQuery(CURRENT_USER);

  return {
    user: data ? data.currentUser : null,
    loading,
    error,
  };
};

export default useAuth;
