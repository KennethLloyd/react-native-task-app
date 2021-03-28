import React from 'react';
import { FlatList } from 'react-native';

import TaskItem from './TaskItem';

const TaskList = () => {
  const list = [
    {
      id: 'abc',
      datetime: '03-23-2021 03:35 PM',
      details: 'Water the plants',
    },
    {
      id: 'bcd',
      datetime: '03-28-2021 04:35 AM',
      details: 'Study geometry',
    },
    {
      id: 'efg',
      datetime: '04-04-2021 12:35 PM',
      details: 'Watch youtube',
    },
    {
      id: 'hij',
      datetime: '04-24-2021 12:35 PM',
      details: 'Sleep early',
    },
    {
      id: 'klm',
      datetime: '05-04-2021 12:35 PM',
      details: 'Play badminton',
    },
  ];

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
