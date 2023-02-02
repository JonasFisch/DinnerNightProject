import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../styles/Color';
import { spacing } from '../styles/Spacing';

type Frameprops = {
  children?: ReactNode;
  withBottomNavBar?: boolean;
  withSubPageHeader?: boolean;
  forSearchPage?: boolean;
};

export const Frame = ({
  children,
  withBottomNavBar = false,
  withSubPageHeader = false,
  forSearchPage = false,
}: Frameprops) => {
  return (
    <View
      style={[
        styles.base,
        withBottomNavBar && styles.frameWithNavBar,
        withSubPageHeader && styles.frameWithHeader,
        forSearchPage && styles.searchPage,
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.xxl,
    backgroundColor: colors.white,
    flex: 1,
  },
  frameWithNavBar: {
    paddingBottom: spacing.m,
  },
  frameWithHeader: {
    paddingTop: spacing.m,
  },
  searchPage: {
    paddingVertical: spacing.m,
  },
});
