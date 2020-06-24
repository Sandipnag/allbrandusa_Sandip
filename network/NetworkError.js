import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default () => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>internet connection error</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    width: '100%',
    padding: 10,
    alignSelf: 'center',
    backgroundColor: '#E31D29',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  errorText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
});
