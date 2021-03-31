import React, { useState } from 'react';
import { Text, Card, Button } from 'react-native-elements';
import {
  View,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@apollo/client';

import Input from '../components/Input';
import Footer from '../components/Footer';
import { SIGNUP } from '../graphql/mutations/User';
import { token } from '../graphql/reactivities/authVariable';

const Signup = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [signup, { loading }] = useMutation(SIGNUP);

  const resetValidationErrors = () => {
    setUsernameError('');
    setPasswordError('');
    setConfirmPasswordError('');
  };

  const handleSignup = async () => {
    resetValidationErrors();

    if (username && password && confirmPassword === password) {
      try {
        const response = await signup({
          variables: {
            username,
            password,
          },
        });

        if (response.data) {
          const { signup: signupToken } = response.data;
          token(signupToken);
          await AsyncStorage.setItem('token', signupToken);
        }
      } catch (e) {
        alert(e.message);
      }
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
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
            style={{ outline: 'none' }}
          />
          <Input
            leftIcon={<FontAwesome name="lock" size={20} color="#888888" />}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
            errorMessage={passwordError}
            style={{ outline: 'none' }}
          />
          <Input
            leftIcon={<FontAwesome name="lock" size={20} color="#888888" />}
            placeholder="Confirm password"
            secureTextEntry={true}
            onChangeText={(value) => setConfirmPassword(value)}
            errorMessage={confirmPasswordError}
            style={{ outline: 'none' }}
          />
          <Button
            title="Sign Up"
            loading={loading}
            buttonStyle={styles.signupBtn}
            onPress={handleSignup}
          />
          <Text style={styles.login}>
            Already have an account?{' '}
            <Text
              style={styles.loginLink}
              onPress={() => navigation.navigate('Login')}
            >
              Login
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
  scrollContainer: {
    justifyContent: 'center',
  },
  signupBtn: {
    marginTop: 10,
    backgroundColor: '#FEB708',
  },
  login: {
    alignSelf: 'center',
    marginTop: 10,
    color: '#888888',
  },
  loginLink: {
    fontWeight: 'bold',
    color: '#888888',
  },
});

export default Signup;
