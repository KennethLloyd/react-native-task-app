import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';

import initDB from './db/initialize.js';
import typeDefs from './schemas/index.js';
import resolvers from './resolvers/index.js';
import auth from './middlewares/authenticate.js';

const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: '/graphql',
  },
  context: auth,
});

server.applyMiddleware({ app });

const port = process.env.PORT || 5000;

(async () => {
  try {
    await initDB();
    console.log('Connection to database has been established successfully');
  } catch (error) {
    console.error(`Unable to connect to the database: ${error}`);
  }
})();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
