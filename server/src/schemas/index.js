import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }

  type Task {
    id: ID!
    datetime: String!
    details: String!
    createdAt: String
    user: User!
  }

  type Query {
    current: User
    task(id: ID!): Task
    tasks: [Task]
  }

  type Mutation {
    register(username: String!, password: String!): String
    login(username: String!, password: String!): String
    addTask(datetime: String!, details: String!): Task
  }
`;

export default typeDefs;
