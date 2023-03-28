import React, { useContext, useState } from 'react';
import {
  Dimensions,
  NavigatorIOS,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AppButton } from '../../components/Button';
import { AppButtonType } from '../../interfaces/Button';
import WelcomeGraphic from '../../assets/graphics/welcome.svg';
import { Frame } from '../../components/Frame';
import { typography } from '../../styles/Typography';
import { spacing } from '../../styles/Spacing';
import { useNavigation } from '@react-navigation/native';

export const WelcomeScreen = () => {

  const navigator = useNavigation()

  const navigateLogin = () => {
    navigator.navigate('Login');
  };
  const navigateRegister = () => {
    navigator.navigate('Register');
  };

  return (
      <Frame>
        <View style={[styles.imageWrapper]}>
          <WelcomeGraphic
            height={'100%'}
            {...(Platform.OS == 'ios' && { width: 'auto' })}
            style={styles.distanceBottom}
          />
        </View>
        <View >
          <Text style={[typography.h2, styles.distanceBottom]}>Welcome!</Text>
          <Text style={[typography.body, styles.distanceBottom]}>
            Plan cooking parties with your friends and quickly find a recipe
            that suits everyone's eating preferences
          </Text>
          <View>
            <AppButton
              title="GET STARTED"
              type={AppButtonType.primary}
              style={[styles.buttonDistance]}
              onPress={navigateRegister}
            />
            <AppButton
              title="I ALREADY HAVE AN ACCOUNT"
              type={AppButtonType.secondary}
              onPress={navigateLogin}
            />
          </View>
        </View>
      </Frame>
  );
};

const styles = StyleSheet.create({
  distanceBottom: {
    marginBottom: spacing.xl,
  },
  buttonDistance: {
    marginBottom: spacing.m,
  },
  imageWrapper: { flex: 1, marginVertical: spacing.xl },
});
