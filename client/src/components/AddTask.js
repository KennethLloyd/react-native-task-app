import React, { useState } from 'react';
import { Button } from 'react-native-elements';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { format, isValid, isMatch } from 'date-fns';

import Input from './Input';
import DateTimePicker from './DateTimePicker';

const initialDate = format(new Date(), 'MM-dd-yyyy');
const initialTime = format(new Date(), 'hh:mm a');

const AddTask = () => {
  const { width } = useWindowDimensions();
  const [task, setTask] = useState('');
  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(initialTime);
  const [taskError, setTaskError] = useState('');
  const [dateError, setDateError] = useState('');
  const [timeError, setTimeError] = useState('');

  const resetValidationErrors = () => {
    setTaskError('');
    setDateError('');
    setTimeError('');
  };

  const isValidDate = () => {
    const pattern = /\d{2}-\d{2}-\d{4}/g;

    if (pattern.test(date) && isValid(new Date(date))) {
      return true;
    }

    return false;
  };

  const isValidTime = () => {
    const pattern = /\d{2}:\d{2}\s{1}(AM|PM)/g;

    if (pattern.test(time) && isMatch(time, 'hh:mm a')) {
      return true;
    }

    return false;
  };

  const handleAdd = () => {
    resetValidationErrors();

    if (task && isValidDate() && isValidTime()) {
      console.log(task);
      console.log(date);
      console.log(time);
    }
    if (!task) {
      setTaskError('Task cannot be empty');
    }
    if (!isValidDate()) {
      setDateError('Invalid date');
    }
    if (!isValidTime()) {
      setTimeError('Invalid time');
    }
  };

  return (
    <>
      <Input
        label="Task"
        onChangeText={(value) => setTask(value)}
        errorMessage={taskError}
        style={{ outline: 'none' }}
      />
      <View style={width > 575 ? styles.datetime : styles.datetimeXs}>
        <DateTimePicker
          date={date}
          setDate={setDate}
          dateError={dateError}
          time={time}
          setTime={setTime}
          timeError={timeError}
        />
      </View>
      <Button title="Add" buttonStyle={styles.addBtn} onPress={handleAdd} />
    </>
  );
};

const styles = StyleSheet.create({
  datetime: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 400,
  },
  datetimeXs: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  addBtn: {
    marginTop: 10,
    backgroundColor: '#FEB708',
  },
});

export default AddTask;
