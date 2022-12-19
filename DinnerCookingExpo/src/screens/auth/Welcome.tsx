import React, {useContext, useState} from 'react';
import {NavigatorIOS, ScrollView, StyleSheet, Text, View} from 'react-native';
import {AppButton} from '../../components/Button';
import {AppButtonType} from '../../interfaces/Button';
import WelcomeGraphic from '../../assets/graphics/welcome.svg';
import {Frame} from '../../components/Frame';
import {typography} from '../../styles/Typography';

export const WelcomeScreen = ({navigation}) => {
  const navigateLogin = () => {
    navigation.push('Login');
  };
  const navigateRegister = () => {
    navigation.push('Register');
  };

  return (
    <ScrollView>
      <Frame>
        <WelcomeGraphic width={'100%'} style={styles.distanceBottom} />
        <Text style={[typography.h1, styles.distanceBottom]}>Welcome!</Text>
        <Text style={[typography.body, styles.distanceBottom]}>
          dakjsdkasjhdkajsdaskhd askjdh askjdh askjdh askjdh askjdh askjdhaksjdh
          askjd
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
      </Frame>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  distanceBottom: {
    marginBottom: 28,
  },
  buttonDistance: {
    marginBottom: 16,
  },
});
