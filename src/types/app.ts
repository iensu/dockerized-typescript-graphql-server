import CatAPI from '../data-sources/cat-api';

export interface DataSources {
  catApi: CatAPI;
}

export interface Context {}

export interface ResolverContext extends Context {
  dataSources: DataSources;
}
