const axios = require('axios');
const chai = require('chai');

chai.use(require('chai-subset'));

const expect = chai.expect;
const { APP_URL } = process.env;

console.log('APP_URL', APP_URL);

const CATS_QUERY = `{
  cats {
    id
    name
    age
  }
}
`;

const ADD_CATS_MUTATION = `mutation AddCats($name: String! $age: Int!) {
  addCat(input: { name: $name age: $age}) {
    id
    status
  }
}`;

describe('Cat server tests', () => {
  it('returns an empty list of cats when the server is empty', async () => {
    const { data: result } = await axios.post(APP_URL, {
      query: CATS_QUERY,
    });

    expect(result).to.eql({
      data: {
        cats: [],
      },
    });
  });

  it('can handle cats being added', async () => {
    const { data: addCatsResult } = await axios.post(APP_URL, {
      query: ADD_CATS_MUTATION,
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
});
