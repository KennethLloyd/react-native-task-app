import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Card } from 'react-native-elements';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  Platform,
  Keyboard,
} from 'react-native';

import Footer from '../components/Footer';
import TaskList from '../components/TaskList';
import { GET_TASKS } from '../graphql/queries/Task';

const Home = () => {
  const { width } = useWindowDimensions();
  const { data } = useQuery(GET_TASKS);
  const [isKeyboardOpen, setKeyboardOpen] = useState(false);

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

  return (
    <View style={styles.container}>
      <View contentContainerStyle={styles.contentContainer}>
        <Card
          containerStyle={
            width > 575
              ? styles.card
              : Platform.OS === 'web'
              ? styles.cardXsWeb
              : styles.cardXsMobile
          }
        >
          <TaskList list={data ? data.tasks : []} />
        </Card>
      </View>
      {isKeyboardOpen ? <></> : <Footer />}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 40,
    marginHorizontal: 'auto',
    width: 500,
    marginBottom: 80,
  },
  cardXsWeb: {
    padding: 30,
    marginBottom: 80,
  },
  cardXsMobile: {
    padding: 30,
    height: '92%',
  },
  container: {
    height: '100%',
  },
  contentContainer: {
    justifyContent: 'center',
  },
});

export default Home;
