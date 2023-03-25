import React, { useEffect, useState } from 'react';
import {
  Image,
  LayoutAnimation,
  Platform,
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
import EyeIcon from '../assets/icons/visibility.svg';
import EyeOffIcon from '../assets/icons/visibility_off.svg';
import ClearIcon from '../assets/icons/close.svg';
import { spacing } from '../styles/Spacing';

export const AppInput = (props: AppInputProps) => {
  const height = Platform.OS == "ios" ? 46 : 56

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
  // REMOVED because: this causes an error in the Searchpage: when adding a searchphrase some items in the filteredlist are not loaded correctly because of animations && also causes flickering when tabbing on the chips on the Searchpage
  //LayoutAnimation.spring();

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

  const clearInput = () => {
    props.onChangeText('');
  };

  const togglePasswordVisibility = () => {
    // toggle text Hidden and change Icon
    setTextHidden(!textHidden);

    if (textHidden) {
      setVisibility(false);
    } else {
      setVisibility(true);
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
    props.customOnFokus && props.customOnFokus();
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
      color: colors.textLight,
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
    <View style={[styles.inputWrapper, props.style]}>
      {/* Label */}
      <Text style={[styles.label, ...labelStyles]}>{props.label}</Text>
      <TextInput
        style={[styles.textInput, ...inputStyles]}
        onFocus={onFocus}
        onEndEditing={endEdit}
        onChangeText={text => {
          props.onChangeText(text);
        }}
        onPressIn={props.onPressIn}
        value={props.value}
        keyboardType={props.keyboardType}
        textContentType={props.textContentType}
        editable={!props.disabled}
        secureTextEntry={textHidden}
      />
      {/* Password hide/show Button */}
      {props.hideable && (
        <Pressable
          onPress={togglePasswordVisibility}
          style={styles.trailingWrapper}>
          {visible ? (
            <EyeIcon style={styles.trailingIcon} />
          ) : (
            <EyeOffIcon style={styles.trailingIcon} />
          )}
        </Pressable>
      )}
      {/* Clear Input Button */}
      {props.clearable && (
        <Pressable onPress={clearInput} style={styles.trailingWrapper}>
          <ClearIcon style={styles.trailingIcon} />
        </Pressable>
      )}
      {/* Error Message */}
      {props.errorMessage && (
        <Text style={[typography.body, styles.errorText]}>
          {props.errorMessage}
        </Text>
      )}
    </View>
  );
};

AppInput.defaultProps = {
  disabled: false,
  hideable: false,
  clearable: false,
  keyboardType: 'default',
  textContentType: 'none',
};
