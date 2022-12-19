import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../styles/Color';
import {AppButtonProps} from '../interfaces/Button';
import {typography} from '../styles/Typography';

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
      onPress={props.onPress}
      onPressIn={() => setActive(true)}
      onPressOut={() => setActive(false)}
      style={[
        computedStyles.button,
        props.style,
        // eslint-disable-next-line react-native/no-inline-styles
        {alignSelf: props.widthFitContent ? 'center' : 'auto'},
      ]}>
      {props.logoSVG ? (
        // when the svg is not shown (properly) check if viewBox is set!
        <props.logoSVG
          height={30}
          width={30}
          fill={colors.textWhite}
          style={styles.layout.tinyLogo}
        />
      ) : null}
      {!props.logoURI ? null : (
        <Image
          style={styles.layout.tinyLogo}
          source={{
            uri: props.logoURI,
          }}
        />
      )}
      <Text style={computedStyles.text}>{props.title}</Text>
    </Pressable>
  );
};
const styles = {
  layout: StyleSheet.create({
    default: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      borderStyle: 'solid',
      borderWidth: 1,
      flexDirection: 'row',
      paddingHorizontal: 16,
      height,
    },
    defaultText: {
      ...typography.button,
      color: colors.textWhite,
      paddingVertical: 16,
    },
    tinyLogo: {
      width: 30,
      height: 30,
      marginRight: 10,
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
      backgroundColor: colors.white,
      borderColor: colors.white,
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
