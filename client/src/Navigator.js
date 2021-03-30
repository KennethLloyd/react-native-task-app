import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useQuery } from '@apollo/client';

import { token } from './graphql/reactivities/authVariable';
import { GET_TOKEN } from './graphql/queries/Reactivity';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';

const Stack = createStackNavigator();

const Navigator = () => {
  const { data } = useQuery(GET_TOKEN);

  const readToken = async () => {
    try {
      const authToken = await AsyncStorage.getItem('token');

      setTimeout(() => token(authToken));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    readToken();
  }, []);

  const options = {
    headerStyle: {
      backgroundColor: '#23AAAA',
    },
    headerTintColor: '#fff',
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {data && data.token ? (
          <>
            <Stack.Screen name="Home" component={Home} options={options} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} options={options} />
            <Stack.Screen name="Sign Up" component={Signup} options={options} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
