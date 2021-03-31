import { gql } from '@apollo/client';

const ADD_TASK = gql`
  mutation AddTask($datetime: String!, $details: String!) {
    addTask(datetime: $datetime, details: $details) {
      id
      datetime
      details
      createdAt
    }
  }
`;

const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
      datetime
      details
      createdAt
    }
  }
`;

export { ADD_TASK, DELETE_TASK };
