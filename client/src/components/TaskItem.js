import React, { useState } from 'react';
import { ListItem } from 'react-native-elements';
import { format } from 'date-fns';
import { useMutation } from '@apollo/client';

import { DELETE_TASK } from '../graphql/mutations/Task';
import { GET_TASKS } from '../graphql/queries/Task';

const TaskItem = ({ item }) => {
  const [check, setCheck] = useState(false);
  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  });

  const handleDelete = () => {
    setCheck(!check);
    try {
      setTimeout(() => {
        deleteTask({
          variables: {
            id: item.id,
          },
        });
      }, 1500);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title
          style={{ textDecoration: check ? 'line-through' : 'none' }}
        >
          {item.details}
        </ListItem.Title>
        <ListItem.Subtitle>
          {format(new Date(parseInt(item.datetime)), 'MM-dd-yyyy hh:mm a')}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.CheckBox
        checked={check}
        checkedColor="#FEB708"
        onPress={handleDelete}
      />
    </ListItem>
  );
};

export default TaskItem;
