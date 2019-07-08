import { gql } from 'apollo-server';
import merge from 'lodash.merge';

import * as GQL from '../types/graphql';
import * as App from '../types/app';
import * as cat from './cat';

export const typeDefs = [
  gql`
    type Query {
      _empty: String
    }

    type Mutation {
      _empty: String
    }

    enum GenericStatus {
      OK
      FAILED
      UNKNOWN
    }
  `,
  cat.typeDefs,
];

export const resolvers: GQL.Resolvers<App.ResolverContext> = merge(cat.resolvers);
