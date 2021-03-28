import React from 'react';

import Input from './Input';

const DateTimePicker = ({
  date,
  setDate,
  dateError,
  time,
  setTime,
  timeError,
}) => {
  return (
    <>
      <Input
        label="Date"
        containerStyle={{ flex: 1 }}
        style={{ outline: 'none' }}
        value={date}
        maxLength={10}
        onChangeText={(val) => setDate(val)}
        errorMessage={dateError}
      />
      <Input
        label="Time"
        containerStyle={{ flex: 1 }}
        style={{ outline: 'none' }}
        value={time}
        maxLength={8}
        onChangeText={(val) => setTime(val)}
        errorMessage={timeError}
      />
    </>
  );
};

export default DateTimePicker;
