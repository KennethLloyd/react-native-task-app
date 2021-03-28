import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Home from './src/screens/Home';

const Stack = createStackNavigator();

const App = () => {
  const options = {
    headerStyle: {
      backgroundColor: '#23AAAA',
    },
    headerTintColor: '#fff',
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={options} />
        <Stack.Screen name="Sign Up" component={Signup} options={options} />
        <Stack.Screen name="Home" component={Home} options={options} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
