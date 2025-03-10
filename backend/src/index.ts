import { PORT } from './util/config';
import { connectToDatabase } from './util/db';
import { startCronJobs } from './util/cronJobs';
import { createApp } from './app';

const start = async () => {
  const { httpServer } = await createApp();

  await connectToDatabase();

  startCronJobs();

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:${PORT}/`);
};

void start();
