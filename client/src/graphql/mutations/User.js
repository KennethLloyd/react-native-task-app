import { gql } from '@apollo/client';

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

const SIGNUP = gql`
  mutation Signup($username: String!, $password: String!) {
    signup(username: $username, password: $password)
  }
`;

export { LOGIN, SIGNUP };
