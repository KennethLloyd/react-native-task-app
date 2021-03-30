import React from 'react';
import { FlatList } from 'react-native';

import TaskItem from './TaskItem';

const TaskList = ({ list }) => {
  const renderItem = ({ item }) => <TaskItem item={item} />;

  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={list}
      renderItem={renderItem}
    />
  );
};

export default TaskList;
