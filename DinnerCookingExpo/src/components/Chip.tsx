import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../styles/Color';
import { spacing } from '../styles/Spacing';
import { UserImage } from './UserImage';
import CloseIcon from '../assets/icons/close.svg';

type ChipProps = {
  label: string;
  onPress: () => void;
  withAvatar?: boolean;
  style?: Object;
};

export const Chip = ({ label, onPress, withAvatar = true, style }: ChipProps) => {
  return (
    <Pressable onPress={onPress} style={[styles.wrapper, style]}>
      {withAvatar && (
        <UserImage name={label} style={styles.avatar} small></UserImage>
      )}
      <Text style={styles.label}>{label}</Text>
      <CloseIcon style={styles.trailingIcon} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: colors.textLight,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 50,
    minHeight: 42,
    marginEnd: spacing.s,
  },
  avatar: {
    marginLeft: spacing.xs,
  },
  label: {
    marginLeft: spacing.s,
    marginRight: spacing.xs,
  },
  trailingIcon: {
    height: 24,
    width: 24,
    color: colors.textLight,
    marginRight: spacing.xs,
  },
});
