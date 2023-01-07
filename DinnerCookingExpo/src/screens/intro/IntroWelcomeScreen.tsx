import React from 'react';
import { View, Text, Button } from 'react-native';

export const IntroWelcomeScreen = ({ navigation }) => {
  const navigateToSteps = () => {
    navigation.navigate('Steps');
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome Screen</Text>
      <Button title="Continue" onPress={navigateToSteps} />
    </View>
  );
};
