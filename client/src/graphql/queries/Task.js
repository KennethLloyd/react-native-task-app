import { gql } from '@apollo/client';

const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      datetime
      details
      createdAt
      user {
        id
        username
      }
    }
  }
`;

const GET_TASK = gql`
  query GetTask($id: ID!) {
    task(id: $id) {
      id
      datetime
      details
      createdAt
      user {
        id
        username
      }
    }
  }
`;

export { GET_TASKS, GET_TASK };
