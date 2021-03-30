import { gql } from '@apollo/client';

const GET_TOKEN = gql`
  query GetToken {
    token @client
  }
`;

const IS_SIGNED_IN = gql`
  query IsSignedIn {
    isSignedIn @client
  }
`;

export { GET_TOKEN, IS_SIGNED_IN };
