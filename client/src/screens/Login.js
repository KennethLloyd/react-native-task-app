import React, { useState } from 'react';
import { Text, Card, Button } from 'react-native-elements';
import {
  ScrollView,
  View,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@apollo/client';

import Input from '../components/Input';
import Footer from '../components/Footer';
import { LOGIN } from '../graphql/mutations/User';
import { token } from '../graphql/reactivities/authVariable';

const Login = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [login, { loading }] = useMutation(LOGIN);

  const resetValidationErrors = () => {
    setUsernameError('');
    setPasswordError('');
  };

  const handleLogin = async () => {
    resetValidationErrors();

    if (username && password) {
      try {
        const response = await login({
          variables: {
            username,
            password,
          },
        });

        if (response.data) {
          const { login: loginToken } = response.data;
          token(loginToken);
          await AsyncStorage.setItem('token', loginToken);
        }
      } catch (e) {
        alert(e.message);
      }
    }
    if (!username) {
      setUsernameError('Username cannot be empty');
    }
    if (!password) {
      setPasswordError('Password cannot be empty');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
            loading={loading}
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
      <Footer />
    </View>
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
    height: '100%',
  },
  loginBtn: {
    marginTop: 10,
    backgroundColor: '#FEB708',
  },
  scrollContainer: {
    justifyContent: 'center',
    marginBottom: 70,
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
