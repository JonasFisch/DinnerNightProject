import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles/Color';
import { AppButtonProps } from '../interfaces/Button';
import { typography } from '../styles/Typography';
import { spacing } from '../styles/Spacing';

const height = 56;
export const AppButton = (props: AppButtonProps) => {
  const [active, setActive] = useState(false);

  const computedStyles = {
    button: [] as Array<Object>,
    text: [] as Array<Object>,
  };

  // add basic layout
  computedStyles.button.push(styles.layout.default);
  computedStyles.text.push(styles.layout.defaultText);

  // push the configured styles
  if (props.type) {
    computedStyles.button.push(styles[props.type].default);
    computedStyles.text.push(styles[props.type].defaultText);
    if (active) {
      computedStyles.button.push(styles[props.type].active);
      computedStyles.text.push(styles[props.type].activeText);
    }
    if (props.disabled) {
      computedStyles.button.push(styles[props.type].disabled);
      computedStyles.text.push(styles[props.type].disabledText);
    }
  }

  return (
    <Pressable
      onPress={(e) => !props.disabled && props.onPress(e)}
      onPressIn={() => setActive(true)}
      onPressOut={() => setActive(false)}
      style={[
        computedStyles.button,
        props.style,
        // eslint-disable-next-line react-native/no-inline-styles
        { alignSelf: props.widthFitContent ? 'center' : 'auto' },
        props.iconOnly && styles.layout.iconButton,
      ]}>
      {!props.logoAsTrailingIcon && props.logoSVG && (
        // when the svg is not shown (properly) check if viewBox is set!
        <props.logoSVG
          fill={props.logoColor ? props.logoColor : colors.white}
          style={[
            styles.layout.leadingIcon,
            props.iconOnly && { marginRight: spacing.none },
          ]}
        />
      )}
      {props.logoURI && (
        <Image
          style={styles.layout.leadingIcon}
          source={{
            uri: props.logoURI,
          }}
        />
      )}
      {!props.iconOnly && (
        <Text style={[computedStyles.text, props.textStyle]}>{props.title}</Text>
      )}
      {props.logoAsTrailingIcon && props.logoSVG && (
        // when the svg is not shown (properly) check if viewBox is set!
        <props.logoSVG
          fill={props.logoColor ? props.logoColor : colors.white}
          style={styles.layout.trailingIcon}
        />
      )}
    </Pressable>
  );
};
const styles = {
  layout: StyleSheet.create({
    default: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      borderStyle: 'solid',
      borderWidth: 1,
      flexDirection: 'row',
      paddingHorizontal: spacing.m,
      height,
    },
    defaultText: {
      ...typography.button,
      color: colors.white,
      paddingVertical: spacing.m,
    },
    leadingIcon: {
      width: 24,
      height: 24,
      marginRight: spacing.xs,
    },
    trailingIcon: {
      width: 24,
      height: 24,
      marginLeft: spacing.xs,
    },
    iconButton: {
      borderRadius: 50,
    },
  }),
  primary: StyleSheet.create({
    default: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    defaultText: {},
    active: {
      backgroundColor: colors.primaryDark,
      borderColor: colors.primaryDark,
    },
    activeText: {},
    disabled: {
      backgroundColor: colors.disabled,
      borderColor: colors.disabled,
    },
    disabledText: {},
  }),
  secondary: StyleSheet.create({
    default: {
      backgroundColor: colors.white,
      borderColor: colors.primary,
    },
    defaultText: {
      color: colors.primary,
    },
    active: {
      borderColor: colors.primaryDark,
    },
    activeText: {
      color: colors.primaryDark,
    },
    disabled: {
      borderColor: colors.disabled,
    },
    disabledText: {
      color: colors.disabled,
    },
  }),
  text: StyleSheet.create({
    default: {
      backgroundColor: colors.transparent,
      borderColor: colors.transparent,
    },
    defaultText: {
      color: colors.primary,
    },
    active: {},
    activeText: {
      color: colors.primaryDark,
    },
    disabled: {},
    disabledText: {
      color: colors.disabled,
    },
  }),
};

AppButton.defaultProps = {
  disabled: false,
  iconOnly: false,
};
