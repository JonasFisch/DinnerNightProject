import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import UserContext from '../../contexts/UserContext';

export const StepScreen = ({ navigation }) => {
  const userContext = useContext(UserContext);
  const nextStep = () => {
    // TODO: go to next Step with navigation.navigate('routename')
  };
  const finishIntro = () => {
    userContext.finishIntro();
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Steps Screen</Text>
      <Button title="Next Step" onPress={nextStep} />
      <Button title="Finish" onPress={finishIntro} />
    </View>
  );
};
