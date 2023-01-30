import { doc, updateDoc } from 'firebase/firestore';
import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import DatabaseContext from '../../contexts/DatabaseContext';
import { useUserContext } from '../../contexts/UserContext';

export const StepScreen = ({ navigation }) => {
  const userContext = useUserContext();
  const nextStep = () => {
    // TODO: go to next Step with navigation.navigate('routename')
  };

  const dbContext = useContext(DatabaseContext);
  const db = dbContext.database;

  console.log(userContext.currentUser, userContext.userDetails?.hasDoneIntro);

  const finishIntro = async () => {
    // userContext.finishIntro();
    console.log(userContext.currentUser);
    if (!userContext.currentUser) {
      console.log('Error: User is not authenticated');
      // TODO: think about what to do here --> maybe redirect to login screen?
      return;
    }
    const docRef = doc(db, 'Users', userContext.currentUser.uid);
    await updateDoc(docRef, {
      hasDoneIntro: true,
    });
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Steps Screen</Text>
      <Button title="Next Step" onPress={nextStep} />
      <Button title="Finish" onPress={finishIntro} />
    </View>
  );
};
