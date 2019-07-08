import { gql } from 'apollo-server';
import merge from 'lodash.merge';
import * as GQL from '../types/graphql';
import * as App from '../types/app';

export const typeDefs = [
  gql`
    type Query {
      _empty: String
    }
  `,
  gql`
    type Cat {
      id: ID!
      name: String!
      age: Int!
    }

    input CatQueryInput {
      id: ID!
    }

    extend type Query {
      cat(input: CatQueryInput!): Cat
      cats: [Cat!]!
    }
  `,
];

export const resolvers: GQL.Resolvers<App.ResolverContext> = merge({
  Query: {
    cat: async (
      _parent: any,
      { input }: GQL.QueryCatArgs,
      { dataSources }: App.ResolverContext
    ) => {
      return dataSources.catApi.getCat(input.id);
    },
    cats: async (_parent: any, _args: {}, { dataSources }: App.ResolverContext) =>
      dataSources.catApi.getCats(),
  },
});
