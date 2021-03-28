import React, { useState } from 'react';
import { Text, Card, Button } from 'react-native-elements';
import { ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import Input from '../components/Input';

const Login = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const resetValidationErrors = () => {
    setUsernameError('');
    setPasswordError('');
  };

  const handleLogin = () => {
    resetValidationErrors();

    if (username && password) {
      console.log(username);
      console.log(password);

      navigation.navigate('Home');
    }
    if (!username) {
      setUsernameError('Username cannot be empty');
    }
    if (!password) {
      setPasswordError('Password cannot be empty');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card containerStyle={width > 575 ? styles.card : styles.cardXs}>
        <Card.Title h4>Task App</Card.Title>
        <Input
          leftIcon={<FontAwesome name="user" size={20} color="#888888" />}
          placeholder="Username"
          onChangeText={(value) => setUsername(value)}
          errorMessage={usernameError}
        />
        <Input
          leftIcon={<FontAwesome name="lock" size={20} color="#888888" />}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
          errorMessage={passwordError}
        />
        <Button
          title="Login"
          buttonStyle={styles.loginBtn}
          onPress={handleLogin}
        />
        <Text style={styles.signup}>
          Don't have an account?{' '}
          <Text
            style={styles.signupLink}
            onPress={() => navigation.navigate('Sign Up')}
          >
            Sign Up
          </Text>
        </Text>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 40,
    marginHorizontal: 'auto',
    width: 500,
  },
  cardXs: {
    padding: 30,
  },
  container: {
    justifyContent: 'center',
  },
  loginBtn: {
    marginTop: 10,
    backgroundColor: '#FEB708',
  },
  signup: {
    alignSelf: 'center',
    marginTop: 10,
    color: '#888888',
  },
  signupLink: {
    fontWeight: 'bold',
    color: '#888888',
  },
});

export default Login;
