import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloProvider } from '@apollo/client';

import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Home from './src/screens/Home';
import client from './src/graphql/client';

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
