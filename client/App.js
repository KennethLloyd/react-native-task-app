import 'react-native-gesture-handler';
import React from 'react';
import { ApolloProvider } from '@apollo/client';

import Navigator from './src/Navigator';
import client from './src/graphql/client';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Navigator />
    </ApolloProvider>
  );
};

export default App;
