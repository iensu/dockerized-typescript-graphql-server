import { createServer } from './server';

const server = createServer({
  playground: true,
  introspection: true,
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Server ready @ ${url}`);
});
