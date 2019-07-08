import { RESTDataSource } from 'apollo-datasource-rest';
import * as GQL from '../types/graphql';

const catList = [
  { id: 'a', name: 'Cuddlepuff', age: 18 },
  { id: 'b', name: 'Meffis', age: 17 },
  { id: 'c', name: 'Mims', age: 16 },
];

class CatAPI extends RESTDataSource {
  constructor() {
    super();
  }

  async getCat(id: string): Promise<GQL.Cat | null> {
    const cat = catList.find((p) => p.id === id);

    return Promise.resolve(cat || null);
  }

  async getCats(): Promise<GQL.Cat[]> {
    return Promise.resolve(catList);
  }
}

export default CatAPI;
