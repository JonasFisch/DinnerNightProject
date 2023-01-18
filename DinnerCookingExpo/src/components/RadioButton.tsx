import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { colors } from '../styles/Color';

type RadioButtonProps = {
  selected: boolean;
  onPress?: (event: GestureResponderEvent) => void;
};

// just a visual component
export const RadioButton = (props: RadioButtonProps) => {
  return (
    <Pressable
      style={[
        styles.radioButton,
        props.selected ? styles.radioButtonSelected : null,
      ]}
      onPress={props.onPress}>
      <View
        style={[
          styles.radioButtonInner,
          props.selected ? styles.radioButtonInnerSelected : null,
        ]}></View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    height: 30,
    width: 30,
    borderRadius: 30,
    backgroundColor: colors.white,
    borderColor: colors.textLight,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: colors.primary,
  },
  radioButtonInner: {
    height: 20,
    width: 20,
    backgroundColor: colors.white,
    borderRadius: 20,
  },
  radioButtonInnerSelected: {
    backgroundColor: colors.primary,
  },
});
