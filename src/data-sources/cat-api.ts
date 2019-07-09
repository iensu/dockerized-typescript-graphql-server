import { RESTDataSource } from 'apollo-datasource-rest';
import * as mongodb from 'mongodb';

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

    return doc;
  }

  async getCats(): Promise<CatDoc[]> {
    return this.db
      .collection(this.collection)
      .find<CatDoc>({})
      .toArray();
  }

  async addCat(cat: { name: string; age: number }) {
    const res = await this.db.collection(this.collection).insertOne(cat);

    return res.insertedId.toHexString();
  }

  async removeCat(id: string) {
    return this.db.collection(this.collection).deleteOne({ _id: new mongodb.ObjectId(id) });
  }
}

export default CatAPI;
