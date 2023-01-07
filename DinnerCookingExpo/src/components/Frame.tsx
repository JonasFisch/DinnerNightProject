import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../styles/Color';
import { spacing } from '../styles/Spacing';

type Frameprops = {
  children?: ReactNode;
  withBottomNavBar?: boolean;
  withSubPageHeader?: boolean;
};

export const Frame = ({
  children,
  withBottomNavBar = false,
  withSubPageHeader = false,
}: Frameprops) => {
  return (
    <View
      style={[
        styles.base,
        withBottomNavBar
          ? styles.frameWithNavBar
          : withSubPageHeader
          ? styles.frameWithHeader
          : styles.frameWithoutNavBar,
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: spacing.m,
    backgroundColor: colors.white,
  },
  frameWithoutNavBar: {
    paddingVertical: spacing.xxl,
  },
  frameWithNavBar: {
    paddingTop: spacing.xxl,
    paddingBottom: spacing.m,
    flex: 1,
  },
  frameWithHeader: {
    paddingTop: spacing.m,
    paddingBottom: spacing.m,
    flex: 1,
  },
});
