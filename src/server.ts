import { ApolloServer } from 'apollo-server';
import { ApolloServerExpressConfig, IResolvers } from 'apollo-server-express';
import { DataSources } from 'apollo-server-core/dist/graphqlOptions';

import { typeDefs, resolvers } from './schemas';
import CatAPI from './data-sources/cat-api';
import * as App from './types/app';

export function createServer(opts: Partial<ApolloServerExpressConfig>): ApolloServer {
  return new ApolloServer({
    typeDefs,
    resolvers: resolvers as IResolvers,
    dataSources: () =>
      ({
        catApi: new CatAPI(),
      } as DataSources<App.DataSources>),
    ...opts,
  });
}
