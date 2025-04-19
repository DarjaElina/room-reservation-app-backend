import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { typeDefs, resolvers } from './graphql/schema';
import { getUserFromReq } from './helpers/helpers';
import User from './models/user';

interface UserContext {
  user: User | null;
}

export const createApp = async () => {
  const app = express();

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const httpServer = http.createServer(app);

  const server = new ApolloServer<UserContext>({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    '/',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const { user } = await getUserFromReq(req);
        return { user };
      },
    })
  );
  return { app, httpServer };
};
