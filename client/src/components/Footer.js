import React from 'react';
import { Text } from 'react-native-elements';
import { View, Platform } from 'react-native';

const Footer = () => {
  return (
    <View
      style={{
        backgroundColor: '#23AAAA',
        borderTop: '2px solid rgb(216, 216, 216)',
        textAlign: 'center',
        padding: 20,
        position: Platform.OS === 'web' ? 'fixed' : 'absolute',
        left: 0,
        bottom: 0,
        height: 60,
        width: '100%',
      }}
    >
      <Text style={{ color: 'white', textAlign: 'center' }}>
        &copy; 2021 All Rights Reserved
      </Text>
    </View>
  );
};

export default Footer;
