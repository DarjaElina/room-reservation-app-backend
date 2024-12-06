import { useMutation, useApolloClient } from '@apollo/client';
import { AUTHENTICATE } from '@/src/graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const [mutate] = useMutation(AUTHENTICATE);
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const signIn = async (username: string, password: string) => {
    try {
      const { data } = await mutate({
        variables: { username, password },
      });

      const token = data?.authenticate?.value;
      if (token) {
        await authStorage?.setAccessToken(token);
        apolloClient.resetStore();
      } else {
        throw new Error('Authentication failed, no token returned.');
      }
    } catch (error) {
      console.error('Sign-in failed:', error);
      throw error;
    }
  };

  return [signIn];
};

export default useSignIn;
