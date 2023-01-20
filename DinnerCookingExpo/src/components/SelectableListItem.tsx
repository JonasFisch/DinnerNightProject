import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import CheckBox from 'expo-checkbox';
import { spacing } from '../styles/Spacing';
import { typography } from '../styles/Typography';
import { colors } from '../styles/Color';
import { UserImage } from './UserImage';

type SelectableListItem = {
  label: string;
  isChecked: boolean;
  onValueChanged: () => void;
  shouldRenderCheckbox: boolean;
};

export const SelectableListItem = ({
  label,
  isChecked,
  onValueChanged,
  shouldRenderCheckbox,
}: SelectableListItem) => {
  return (
    <Pressable style={styles.container} onPress={onValueChanged}>
      <View style={styles.userWrapper}>
        <UserImage name={label} style={styles.avatar}></UserImage>
        <Text style={[typography.body, styles.text]} numberOfLines={1}>
          {label}
        </Text>
      </View>
      {shouldRenderCheckbox && (
        <CheckBox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={onValueChanged}
          color={colors.textLight}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xxs,
    paddingVertical: spacing.s,
  },
  userWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    marginRight: spacing.m,
  },
  text: {
    flex: 1,
  },
  checkbox: {
    marginLeft: spacing.m,
  },
});
