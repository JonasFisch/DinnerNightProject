import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  StyleProp,
  ViewStyle,
  Dimensions,
} from 'react-native';
import { typography } from '../styles/Typography';
import { colors } from '../styles/Color';
import CheckIcon from '../assets/icons/check.svg';

type StepperProps = {
  currentStep: number;
  totalStepCount: number;
  onCurrentStepChange: () => void;
  style?: StyleProp<ViewStyle>;
};

export const Stepper = ({
  currentStep,
  totalStepCount,
  onCurrentStepChange,
  style,
}: StepperProps) => {
  const stepNumbers = [];
  for (let i = 0; i < totalStepCount; i++) {
    stepNumbers.push(i);
  }
  const stepperMaxWidth = Dimensions.get('window').width - 32 - 16;
  return (
    <View style={[styles.wrapper, style]}>
      <View
        style={[
          styles.baseHorizontalLine,
          styles.solidHorizontalLine,
          {
            right:
              8 + (1 - currentStep / (totalStepCount - 1)) * stepperMaxWidth,
          },
        ]}
      />
      <View
        style={[
          styles.baseHorizontalLine,
          styles.dashedHorizontalLine,
          {
            left: 8 + (currentStep / (totalStepCount - 1)) * stepperMaxWidth,
          },
        ]}
      />
      {stepNumbers.map(number => (
        <Pressable
          onPress={onCurrentStepChange}
          style={[
            styles.baseCircle,
            number == currentStep
              ? styles.activeCircle
              : number < currentStep
              ? styles.checkedCircle
              : styles.uncheckedCircle,
          ]}
          key={number}>
          {number < currentStep ? (
            <CheckIcon width={20} style={styles.icon} />
          ) : (
            <Text
              style={[
                typography.button,
                number == currentStep
                  ? styles.activeLabel
                  : styles.uncheckedLabel,
              ]}>
              {++number}
            </Text>
          )}
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  baseCircle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: colors.white,
  },
  uncheckedCircle: {
    width: 30,
    height: 30,
    margin: 6,
    borderColor: colors.textLight,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  activeCircle: {
    width: 42,
    height: 42,
    margin: 0,
    color: colors.white,
    borderColor: colors.primary,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  checkedCircle: {
    width: 30,
    height: 30,
    margin: 6,
    backgroundColor: colors.primary,
  },
  activeLabel: {
    color: colors.primary,
  },
  uncheckedLabel: {
    color: colors.textLight,
  },
  icon: {
    color: colors.white,
  },
  baseHorizontalLine: {
    height: 0,
    borderBottomColor: colors.text,
    borderBottomWidth: 1,
    position: 'absolute',
    justifyContent: 'center',
  },
  dashedHorizontalLine: {
    borderStyle: 'dashed',
    right: 8,
    left: 8,
  },
  solidHorizontalLine: {
    borderStyle: 'solid',
    left: 8,
  },
});
