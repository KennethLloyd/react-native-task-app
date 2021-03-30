import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
} from '@apollo/client';
import Constants from 'expo-constants';

import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Home from './src/screens/Home';

const httpLink = new HttpLink({ uri: Constants.manifest.extra.API_URL });
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      // authorization: localStorage.getItem('token') || null,
      authorization: '',
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

const Stack = createStackNavigator();

const App = () => {
  const options = {
    headerStyle: {
      backgroundColor: '#23AAAA',
    },
    headerTintColor: '#fff',
  };

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={options} />
          <Stack.Screen name="Sign Up" component={Signup} options={options} />
          <Stack.Screen name="Home" component={Home} options={options} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
