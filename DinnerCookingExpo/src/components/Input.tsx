import React, { useEffect, useState } from 'react';
import {
  Image,
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors } from '../styles/Color';
import { typography } from '../styles/Typography';
import { AppInputProps } from '../interfaces/Input';
import { sizes } from '../styles/Sizes';
import EyeIcon from '../assets/icons/eye.svg';
import EyeOffIcon from '../assets/icons/eye-off.svg';
import { spacing } from '../styles/Spacing';

export const AppInput = (props: AppInputProps) => {
  const height = 56;

  // const [text, setText] = useState('');
  const [labelTransform, setLabelTransform] = useState(
    (height - typography.body.lineHeight) / 2,
  );
  const [labelTop, setLabelTop] = useState(0);
  const [active, setActive] = useState(false);
  const [textHidden, setTextHidden] = useState(false);
  const [visible, setVisibility] = useState(true);

  useEffect(() => {
    setTextHidden(props.hideable ?? false);
    if (props.value === '' && !active) {
      transformLabelNormal();
    } else {
      transformLabelBorder();
    }

    if (props.hideable) {
      setVisibility(true);
    }
  }, [props.hideable, props.value, active]);

  // activate layout animations
  LayoutAnimation.spring();

  // change label back to normal
  const endEdit = e => {
    if (props.value === '') {
      transformLabelNormal();
    }
    setActive(false);
    if (props.onEndEdit) {
      props.onEndEdit(e);
    }
  };

  const trailingIconAction = () => {
    if (props.hideable) {
      // toggle text Hidden and change Icon
      setTextHidden(!textHidden);
      console.log(textHidden);

      if (textHidden) {
        setVisibility(false);
      } else {
        setVisibility(true);
      }
    }
  };

  const transformLabelNormal = () => {
    setLabelTransform((height - typography.body.lineHeight) / 2);
    setLabelTop(0);
  };

  const transformLabelBorder = () => {
    setLabelTransform(0);
    setLabelTop(-typography.body.lineHeight / 2);
  };

  // move label to top border on focus
  const onFocus = () => {
    transformLabelBorder();
    setActive(true);
  };

  // calulcate style sheet
  const styles = StyleSheet.create({
    inputWrapper: {
      width: '100%',
      height: height,
    },
    label: {
      position: 'absolute',
      marginLeft: spacing.m,
      color: active ? colors.primaryDark : colors.text,
      backgroundColor: colors.white,
      zIndex: 1,
      paddingLeft: spacing.xxs,
      paddingRight: spacing.xxs,
      top: labelTop,
      transform: [
        {
          translateY: labelTransform,
        },
      ],
    },
    textInput: {
      borderColor: active ? colors.primaryDark : colors.textLight,
      borderWidth: active ? 2 : 1,
      borderRadius: sizes.borderRadius,
      padding: spacing.s,
      paddingLeft: spacing.m,
    },
    trailingWrapper: {
      position: 'absolute',
      right: 0,
      top: (height - 24) / 2 - 12,
      padding: spacing.s,
    },
    trailingIcon: {
      height: 24,
      width: 24,
    },
    errorFrame: {
      borderColor: colors.error,
    },
    errorText: {
      marginLeft: spacing.xs,
      marginTop: spacing.xxs,
      color: colors.error,
    },
    errorLabel: {
      color: colors.error,
    },
    disabledFrame: {
      borderColor: colors.disabled,
    },
    disabledLabel: {
      color: colors.disabled,
    },
  });

  // calc input and label styles
  const inputStyles: Array<Object> = [];
  const labelStyles: Array<Object> = [];
  if (props.errorMessage) {
    inputStyles.push(styles.errorFrame);
    labelStyles.push(styles.errorLabel);
  }
  if (props.disabled) {
    inputStyles.push(styles.disabledFrame);
    labelStyles.push(styles.disabledLabel);
  }

  return (
    <View style={styles.inputWrapper}>
      {/* Label */}
      <Text style={[styles.label, ...labelStyles]}>{props.label}</Text>
      <TextInput
        style={[styles.textInput, ...inputStyles]}
        onFocus={onFocus}
        onEndEditing={endEdit}
        onChangeText={props.onChangeText}
        value={props.value}
        keyboardType={props.keyboardType}
        textContentType={props.textContentType}
        editable={!props.disabled}
        secureTextEntry={textHidden}
      />
      {/* Button */}
      {!props.hideable ? null : (
        <Pressable
          onPress={() => trailingIconAction()}
          style={styles.trailingWrapper}>
          {visible ? (
            <EyeIcon style={styles.trailingIcon} />
          ) : (
            <EyeOffIcon style={styles.trailingIcon} />
          )}
        </Pressable>
      )}
      {/* Error Message */}
      {props.errorMessage ? (
        <Text style={[typography.body, styles.errorText]}>
          {props.errorMessage}
        </Text>
      ) : null}
    </View>
  );
};
