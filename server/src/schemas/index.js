import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: String!
    username: String!
  }

  type Beer {
    id: Int!
    name: String!
    brand: String
    price: Float
  }

  type Query {
    current: User
    beer(id: Int!): Beer
    beers(brand: String!): [Beer]
  }

  type Mutation {
    register(username: String!, password: String!): String
    login(username: String!, password: String!): String
  }
`;

export default typeDefs;
