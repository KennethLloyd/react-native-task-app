import { ApolloClient, HttpLink, ApolloLink, concat } from '@apollo/client';
import Constants from 'expo-constants';

import cache from './cache';
import { token } from './reactivities/authVariable';

const httpLink = new HttpLink({ uri: Constants.manifest.extra.API_URL });
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: token() ? `Bearer ${token()}` : '',
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  cache,
  link: concat(authMiddleware, httpLink),
});

export default client;
