import React from 'react';
import { FlatList, View } from 'react-native';
import { Card } from 'react-native-elements';

import AddTask from './AddTask';
import TaskItem from './TaskItem';

const TaskList = ({ list }) => {
  const renderItem = ({ item }) => <TaskItem item={item} />;

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <View style={{ marginBottom: 50 }}>
            <AddTask />
          </View>
          <View>
            <Card.Title h4>To-Do</Card.Title>
          </View>
        </>
      }
      keyExtractor={(item) => item.id}
      data={list}
      renderItem={renderItem}
    />
  );
};

export default TaskList;
