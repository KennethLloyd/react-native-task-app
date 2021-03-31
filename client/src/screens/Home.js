import React from 'react';
import { useQuery } from '@apollo/client';
import { Card } from 'react-native-elements';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import TaskList from '../components/TaskList';
import { GET_TASKS } from '../graphql/queries/Task';

const Home = () => {
  const { width } = useWindowDimensions();
  const { data } = useQuery(GET_TASKS);

  return (
    <View contentContainerStyle={styles.container}>
      <Card containerStyle={width > 575 ? styles.card : styles.cardXs}>
        <TaskList list={data ? data.tasks : []} />
      </Card>
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
    justifyContent: 'center',
  },
});

export default Home;
