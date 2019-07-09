import * as dotenv from 'dotenv';
dotenv.config();

import { MongoClient } from 'mongodb';

import Config from './config';
import { createServer } from './server';

async function startServer() {
  try {
    console.log(`Starting server @ ${Config.PORT}`);
    const client = await MongoClient.connect(Config.MONGODB_URI, {
      useNewUrlParser: true,
      reconnectTries: 2,
      reconnectInterval: 500,
      connectTimeoutMS: 3000,
      socketTimeoutMS: 3000,
    });

    const server = createServer(
      { db: client.db() },
      {
        playground: Config.PLAYGROUND_ENABLED,
        introspection: Config.INTROSPECTION_ENABLED,
      }
    );

    const { url } = await server.listen({ port: Config.PORT });

    console.log(`Server ready @ ${url}`);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

startServer();
