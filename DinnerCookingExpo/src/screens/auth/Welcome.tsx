import React, { useContext, useState } from 'react';
import { NavigatorIOS, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '../../components/Button';
import { AppButtonType } from '../../interfaces/Button';
import WelcomeGraphic from '../../assets/graphics/welcome.svg';
import { Frame } from '../../components/Frame';
import { typography } from '../../styles/Typography';
import { spacing } from '../../styles/Spacing';

export const WelcomeScreen = ({ navigation }) => {
  const navigateLogin = () => {
    navigation.push('Login');
  };
  const navigateRegister = () => {
    navigation.push('Register');
  };

  return (
    <Frame>
      <View style={{ flex: 1, marginVertical: spacing.xl }}>
        <WelcomeGraphic height={'100%'} style={styles.distanceBottom} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[typography.h1, styles.distanceBottom]}>Welcome!</Text>
        <Text style={[typography.body, styles.distanceBottom]}>
          Plan cooking parties with your friends and quickly find a recipe that
          suits everyone's eating preferences
        </Text>
        <View style={styles.distanceBottom}>
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
});
