import React from 'react';
import { FlatList } from 'react-native';

import TaskItem from './TaskItem';

const TaskList = ({ list }) => {
  const renderItem = ({ item, index }) => (
    <TaskItem item={item} index={index} />
  );

  return (
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      data={list}
      renderItem={renderItem}
    />
  );
};

export default TaskList;
