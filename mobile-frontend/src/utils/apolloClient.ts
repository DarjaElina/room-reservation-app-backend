import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AuthStorage from './authStorage';
import { relayStylePagination } from '@apollo/client/utilities';
import { StoreObject } from '@apollo/client/utilities';
import { Reference } from '@apollo/client/utilities';

const authStorage = new AuthStorage();

const BACKEND_URL = __DEV__
  ? process.env.EXPO_PUBLIC_BACKEND_URL_DEV
  : process.env.EXPO_PUBLIC_BACKEND_URL;

const httpLink = createHttpLink({
  uri: BACKEND_URL,
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        rooms: relayStylePagination(),
      },
    },
    Room: {
      fields: {
        equipment: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          merge(existing = [], incoming: any[], { readField }) {
            if (
              readField(
                'id',
                incoming as unknown as Reference | StoreObject | undefined
              )
            ) {
              return [...existing, ...incoming];
            }
            return incoming;
          },
        },
      },
    },
  },
});

const createApolloClient = (authStorage: AuthStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (e) {
      console.log(e);
      return {
        headers,
      };
    }
  });
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
  });
};

const apolloClient = createApolloClient(authStorage);

export default apolloClient;
