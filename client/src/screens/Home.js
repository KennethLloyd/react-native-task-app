import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Text, Card, Input, Button } from 'react-native-elements';
import {
  ScrollView,
  View,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AddTask from '../components/AddTask';
import TaskList from '../components/TaskList';
import { GET_TASKS } from '../graphql/queries/Task';

const Home = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const { data } = useQuery(GET_TASKS);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card containerStyle={width > 575 ? styles.card : styles.cardXs}>
        <AddTask />
      </Card>
      <Card containerStyle={width > 575 ? styles.card : styles.cardXs}>
        <Card.Title>To-Do</Card.Title>
        <TaskList list={data ? data.tasks : []} />
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
});

export default Home;
