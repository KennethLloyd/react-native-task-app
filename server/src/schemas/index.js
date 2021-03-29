import { gql } from 'apollo-server-express';

import userTypeDefs from './user.js';
import taskTypeDefs from './task.js';

const baseTypeDefs = gql`
  type Query
  type Mutation
`;

const typeDefs = [baseTypeDefs, userTypeDefs, taskTypeDefs];

export default typeDefs;
