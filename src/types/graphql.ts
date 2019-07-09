import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AddCatInput = {
  name: Scalars['String'];
  age: Scalars['Int'];
};

export type AddCatOutput = {
  __typename?: 'AddCatOutput';
  status: GenericStatus;
  id?: Maybe<Scalars['ID']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export type Cat = {
  __typename?: 'Cat';
  id: Scalars['ID'];
  name: Scalars['String'];
  age: Scalars['Int'];
  race: Scalars['String'];
  owner: Scalars['String'];
};

export type CatQueryInput = {
  id: Scalars['ID'];
};

export enum GenericStatus {
  Ok = 'OK',
  Failed = 'FAILED',
  Unknown = 'UNKNOWN',
}

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  addCat: AddCatOutput;
  removeCat: RemoveCatOutput;
};

export type MutationAddCatArgs = {
  input: AddCatInput;
};

export type MutationRemoveCatArgs = {
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  cat?: Maybe<Cat>;
  cats: Array<Cat>;
};

export type QueryCatArgs = {
  input: CatQueryInput;
};

export type RemoveCatOutput = {
  __typename?: 'RemoveCatOutput';
  status: GenericStatus;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  CatQueryInput: CatQueryInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Cat: ResolverTypeWrapper<Cat>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  AddCatInput: AddCatInput;
  AddCatOutput: ResolverTypeWrapper<AddCatOutput>;
  GenericStatus: GenericStatus;
  RemoveCatOutput: ResolverTypeWrapper<RemoveCatOutput>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CacheControlScope: CacheControlScope;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  String: Scalars['String'];
  CatQueryInput: CatQueryInput;
  ID: Scalars['ID'];
  Cat: Cat;
  Int: Scalars['Int'];
  Mutation: {};
  AddCatInput: AddCatInput;
  AddCatOutput: AddCatOutput;
  GenericStatus: GenericStatus;
  RemoveCatOutput: RemoveCatOutput;
  Boolean: Scalars['Boolean'];
  CacheControlScope: CacheControlScope;
  Upload: Scalars['Upload'];
};

export type CacheControlDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = { maxAge?: Maybe<Maybe<Scalars['Int']>>; scope?: Maybe<Maybe<CacheControlScope>> }
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AddCatOutputResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes['AddCatOutput']
> = {
  status?: Resolver<ResolversTypes['GenericStatus'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
};

export type CatResolvers<ContextType = any, ParentType = ResolversParentTypes['Cat']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  age?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  race?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType = ResolversParentTypes['Mutation']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  addCat?: Resolver<ResolversTypes['AddCatOutput'], ParentType, ContextType, MutationAddCatArgs>;
  removeCat?: Resolver<
    ResolversTypes['RemoveCatOutput'],
    ParentType,
    ContextType,
    MutationRemoveCatArgs
  >;
};

export type QueryResolvers<ContextType = any, ParentType = ResolversParentTypes['Query']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cat?: Resolver<Maybe<ResolversTypes['Cat']>, ParentType, ContextType, QueryCatArgs>;
  cats?: Resolver<Array<ResolversTypes['Cat']>, ParentType, ContextType>;
};

export type RemoveCatOutputResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes['RemoveCatOutput']
> = {
  status?: Resolver<ResolversTypes['GenericStatus'], ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type Resolvers<ContextType = any> = {
  AddCatOutput?: AddCatOutputResolvers<ContextType>;
  Cat?: CatResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RemoveCatOutput?: RemoveCatOutputResolvers<ContextType>;
  Upload?: GraphQLScalarType;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>;
};

/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;
