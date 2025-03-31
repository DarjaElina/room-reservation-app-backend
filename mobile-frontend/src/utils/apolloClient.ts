import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AuthStorage from './authStorage';
import { relayStylePagination } from '@apollo/client/utilities';
import { StoreObject } from '@apollo/client/utilities';

const authStorage = new AuthStorage();

const httpLink = createHttpLink({
  uri: 'https://backend-rough-wildflower-6075.fly.dev/',
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
          merge(existing = [], incoming: unknown[], { readField }) {
            const incomingObjects = incoming as StoreObject[];

            if (incomingObjects.some((item) => readField('id', item))) {
              return [...existing, ...incomingObjects];
            }
            return incomingObjects;
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
