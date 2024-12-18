import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AuthStorage from './authStorage';
import { relayStylePagination } from '@apollo/client/utilities';

const authStorage = new AuthStorage();

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
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
          merge(existing = [], incoming: any[], { readField }) {
            if (readField('id', incoming)) {
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
