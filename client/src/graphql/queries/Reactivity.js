import { gql } from '@apollo/client';

const GET_TOKEN = gql`
  query GetToken {
    token @client
  }
`;

export { GET_TOKEN };
