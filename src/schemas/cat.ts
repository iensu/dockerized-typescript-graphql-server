import { gql } from 'apollo-server';

import * as App from '../types/app';
import * as GQL from '../types/graphql';
import { CatDoc } from '../data-sources/cat-api';

export const typeDefs = gql`
  type Cat {
    id: ID!
    name: String!
    age: Int!
    race: String!
    owner: String!
  }

  input CatQueryInput {
    id: ID!
  }

  extend type Query {
    cat(input: CatQueryInput!): Cat
    cats: [Cat!]!
  }

  input AddCatInput {
    name: String!
    age: Int!
  }

  type AddCatOutput {
    status: GenericStatus!
    id: ID
  }

  type RemoveCatOutput {
    status: GenericStatus!
  }

  extend type Mutation {
    addCat(input: AddCatInput!): AddCatOutput!
    removeCat(id: String!): RemoveCatOutput!
  }
`;

const cat: GQL.Resolver<GQL.Maybe<CatDoc>, {}, App.ResolverContext, GQL.QueryCatArgs> = (
  _parent,
  { input },
  { dataSources }
) => dataSources.catApi.getCat(input.id);

const cats: GQL.Resolver<CatDoc[], {}, App.ResolverContext, {}> = (
  _parent,
  _args,
  { dataSources }
) => dataSources.catApi.getCats();

const addCat: GQL.Resolver<
  GQL.AddCatOutput,
  {},
  App.ResolverContext,
  GQL.MutationAddCatArgs
> = async (_parent, { input }, { dataSources }) => {
  const id = await dataSources.catApi.addCat(input);
  return { status: GQL.GenericStatus.Ok, id };
};

const removeCat: GQL.Resolver<
  GQL.RemoveCatOutput,
  {},
  App.ResolverContext,
  GQL.MutationRemoveCatArgs
> = async (_parent, { id }, { dataSources }) => {
  const response = await dataSources.catApi.removeCat(id);

  if (response.deletedCount === 1) {
    return { status: GQL.GenericStatus.Ok };
  }

  return { status: GQL.GenericStatus.Failed };
};

export const resolvers = {
  Query: {
    cat,
    cats,
  },
  Mutation: {
    addCat,
    removeCat,
  },
  Cat: {
    id: (catDoc: CatDoc) => catDoc._id,
    race: () => 'Unknown',
    owner: () => 'no-one',
  },
};
