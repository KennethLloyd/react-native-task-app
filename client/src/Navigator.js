import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useQuery, useApolloClient } from '@apollo/client';
import { MaterialIcons } from '@expo/vector-icons';

import { token } from './graphql/reactivities/authVariable';
import { GET_TOKEN } from './graphql/queries/Reactivity';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';

const Stack = createStackNavigator();

const Navigator = () => {
  const { data } = useQuery(GET_TOKEN);
  const client = useApolloClient();

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

  const handleLogOut = async () => {
    token(null);
    await AsyncStorage.removeItem('token');
    setTimeout(() => client.resetStore());
  };

  const options = {
    headerStyle: {
      backgroundColor: '#23AAAA',
    },
    headerTintColor: '#fff',
  };

  const logOutOption = {
    headerRight: () => (
      <MaterialIcons
        name="logout"
        style={styles.logOut}
        size={24}
        color="white"
        onPress={handleLogOut}
      />
    ),
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={options}>
        {data && data.token ? (
          <>
            <Stack.Screen name="Home" component={Home} options={logOutOption} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Sign Up" component={Signup} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  logOut: {
    marginRight: 20,
  },
});

export default Navigator;
