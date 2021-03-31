import { gql } from 'apollo-server-express';

const taskTypeDefs = gql`
  type Task {
    id: ID!
    datetime: String!
    details: String!
    createdAt: String
    user: User!
  }

  extend type Query {
    task(id: ID!): Task
    tasks: [Task]
  }

  extend type Mutation {
    addTask(datetime: String!, details: String!): Task
    deleteTask(id: ID!): Task
  }
`;

export default taskTypeDefs;
