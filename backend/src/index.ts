import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { typeDefs, resolvers } from './graphql/schema';
import { PORT } from './util/config';
import { connectToDatabase } from './util/db';
import User from './models/user';
import { startCronJobs } from './util/cronJobs';
import { getUserFromReq } from './helpers/helpers';

interface MyContext {
  user: User | null;
}

const start = async() => {
  const app = express();
  
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const httpServer = http.createServer(app);

  const server = new ApolloServer<MyContext>({
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
        const { user, isAdmin } = await getUserFromReq(req);

        return { user, isAdmin };
      },
    }),
  );

  await connectToDatabase();

  startCronJobs();

  await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${PORT}/`);
};

void start();
