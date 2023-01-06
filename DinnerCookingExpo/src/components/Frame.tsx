import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../styles/Color';
import { spacing } from '../styles/Spacing';

type Frameprops = {
  children?: ReactNode;
  withBottomNavBar?: boolean;
}

export const Frame = ({ children, withBottomNavBar = false }: Frameprops) => {
  return <View style={withBottomNavBar ? styles.frameWithNavBar : styles.frameWithoutNavBar}>{children}</View>;
};

const styles = StyleSheet.create({
  frameWithoutNavBar: {
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.m,
    backgroundColor: colors.white,
  },
  frameWithNavBar: {
    paddingTop: spacing.xxl,
    paddingBottom: spacing.m,
    paddingHorizontal: spacing.m,
    backgroundColor: colors.white,
    flex: 1
  },
});
