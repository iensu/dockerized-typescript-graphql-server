import { RESTDataSource } from 'apollo-datasource-rest';
import * as mongodb from 'mongodb';

import * as GQL from '../types/graphql';
import Config from '../config';

const catList = [
  { id: 'a', name: 'Cuddlepuff', age: 18 },
  { id: 'b', name: 'Meffis', age: 17 },
  { id: 'c', name: 'Mims', age: 16 },
];

export interface CatDoc {
  _id: string;
  name: string;
  age: number;
}

class CatAPI extends RESTDataSource {
  private db: mongodb.Db;
  private collection = 'cats';

  constructor(db: mongodb.Db) {
    super();

    this.db = db;
  }

  async getCat(id: string): Promise<CatDoc | null> {
    const doc = await this.db
      .collection(this.collection)
      .findOne<CatDoc>({ _id: new mongodb.ObjectId(id) });

    return Promise.resolve(doc);
  }

  async getCats(): Promise<CatDoc[]> {
    return this.db
      .collection(this.collection)
      .find<CatDoc>({})
      .toArray();
  }

  async addCat(cat: { name: string; age: number }) {
    const res = await this.db.collection(this.collection).insertOne(cat);

    return Promise.resolve(res.insertedId.toHexString());
  }
}

export default CatAPI;
