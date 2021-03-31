import React, { useState, useEffect } from 'react';
import { Text, Card, Button } from 'react-native-elements';
import {
  View,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  Keyboard,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@apollo/client';

import Input from '../components/Input';
import Footer from '../components/Footer';
import { SIGNUP } from '../graphql/mutations/User';
import { token } from '../graphql/reactivities/authVariable';
import colors from '../variables/colors';

const Signup = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isKeyboardOpen, setKeyboardOpen] = useState(false);
  const [signup, { loading }] = useMutation(SIGNUP);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardOpen(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardOpen(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

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
            leftIcon={<FontAwesome name="user" size={20} color={colors.gray} />}
            placeholder="Username"
            onChangeText={(value) => setUsername(value)}
            errorMessage={usernameError}
            style={{ outline: 'none' }}
          />
          <Input
            leftIcon={<FontAwesome name="lock" size={20} color={colors.gray} />}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
            errorMessage={passwordError}
            style={{ outline: 'none' }}
          />
          <Input
            leftIcon={<FontAwesome name="lock" size={20} color={colors.gray} />}
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
      {isKeyboardOpen ? <></> : <Footer />}
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
    backgroundColor: colors.primary,
  },
  login: {
    alignSelf: 'center',
    marginTop: 10,
    color: colors.gray,
  },
  loginLink: {
    fontWeight: 'bold',
    color: colors.gray,
  },
});

export default Signup;
