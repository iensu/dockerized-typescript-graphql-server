const axios = require('axios');
const chai = require('chai');
const { MongoClient } = require('mongodb');

chai.use(require('chai-subset'));

const expect = chai.expect;
const { APP_URL, MONGODB_URI } = process.env;

const CATS_QUERY = `{
  cats {
    id
    name
    age
  }
}
`;

const ADD_CAT_MUTATION = `mutation AddCat($name: String! $age: Int!) {
  addCat(input: { name: $name age: $age}) {
    id
    status
  }
}`;

const REMOVE_CAT_MUTATION = `mutation RemoveCat($id: String!) {
  removeCat(id: $id) {
    status
  }
}`;

describe('Cat server tests', () => {
  afterEach(async () => {
    const mongoClient = await MongoClient.connect(MONGODB_URI, {
      useNewUrlParser: true,
    });

    const collections = await mongoClient
      .db()
      .listCollections({}, { nameOnly: true })
      .toArray();

    await Promise.all(collections.map(({ name }) => mongoClient.db().dropCollection(name)));

    await mongoClient.close();
  });

  it('can list an empty set of cats', async () => {
    const { data: result } = await axios.post(APP_URL, {
      query: CATS_QUERY,
    });

    expect(result).to.eql({
      data: {
        cats: [],
      },
    });
  });

  it('cats can be added', async () => {
    const { data: addCatsResult } = await axios.post(APP_URL, {
      query: ADD_CAT_MUTATION,
      variables: {
        name: 'Cuddlepuff',
        age: 5,
      },
    });

    expect(addCatsResult).to.containSubset({
      data: {
        addCat: {
          status: 'OK',
          id: (value) => value.length > 0,
        },
      },
    });

    const { data: catsResult } = await axios.post(APP_URL, {
      query: CATS_QUERY,
    });

    expect(catsResult).to.containSubset({
      data: {
        cats: [
          {
            name: 'Cuddlepuff',
            age: 5,
            id: addCatsResult.data.addCat.id,
          },
        ],
      },
    });
  });

  it('cats can be removed', async () => {
    const { data: addCatResult } = await axios.post(APP_URL, {
      query: ADD_CAT_MUTATION,
      variables: { name: 'Meffis', age: 99 },
    });

    const { data: catsResult } = await axios.post(APP_URL, {
      query: CATS_QUERY,
    });

    expect(catsResult.data.cats).to.have.property('length', 1);

    const { data: removeCatResult } = await axios.post(APP_URL, {
      query: REMOVE_CAT_MUTATION,
      variables: { id: addCatResult.data.addCat.id },
    });

    expect(removeCatResult.data.removeCat.status).to.eql('OK');

    const { data: result } = await axios.post(APP_URL, {
      query: CATS_QUERY,
    });

    expect(result.data.cats).to.have.property('length', 0);
  });
});
