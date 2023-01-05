import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../styles/Color';
import { spacing } from '../styles/Spacing';

export const Frame = props => {
  return <View style={styles.frame}>{props.children}</View>;
};

const styles = StyleSheet.create({
  frame: {
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.m,
    backgroundColor: colors.white,
    minHeight: '100%',
  },
});
