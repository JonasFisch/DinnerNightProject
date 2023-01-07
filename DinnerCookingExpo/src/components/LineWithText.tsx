import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles/Color';
import { typography } from '../styles/Typography';
import { sizes } from '../styles/Sizes';
import { spacing } from '../styles/Spacing';

export const LineWithText = props => {
  return (
    <View style={styles.lineWrapper}>
      <View style={styles.textWrapper}>
        <Text style={[typography.body, styles.text]}>{props.children}</Text>
      </View>
      <View style={styles.line}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  lineWrapper: {
    width: '100%',
  },
  line: {
    backgroundColor: colors.textLight,
    height: 1,
    position: 'absolute',
    width: '100%',
    top: typography.subtitle2.lineHeight / 2 - 1,
  },
  textWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    backgroundColor: colors.white,
    color: colors.textLight,
    zIndex: 2,
    paddingHorizontal: spacing.m,
  },
});
