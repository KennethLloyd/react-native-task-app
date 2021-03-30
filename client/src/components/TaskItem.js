import React, { useState } from 'react';
import { ListItem } from 'react-native-elements';
import { format } from 'date-fns';

const TaskItem = ({ item, index }) => {
  const [check, setCheck] = useState(false);

  const handleDelete = () => {
    setCheck(!check);
  };

  return (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.details}</ListItem.Title>
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
