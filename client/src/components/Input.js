import React from 'react';
import { Platform } from 'react-native';
import { Input } from 'react-native-elements';

const CustomInput = (props) => {
  return (
    <Input
      {...props}
      style={Platform.OS === 'web' ? { outline: 'none' } : ''}
    />
  );
};

export default CustomInput;
