import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../styles/Color';

export const Frame = props => {
  return <View style={styles.frame}>{props.children}</View>;
};

const styles = StyleSheet.create({
  frame: {
    paddingVertical: 40,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    minHeight: '100%',
  },
});
