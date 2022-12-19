import React, { useContext } from 'react';
import {View, Text, Button} from 'react-native';
import UserContext from '../../contexts/UserContext';

export const FriendScreen = () => {
  const user = useContext(UserContext);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Friends Screen</Text>
      <Text>Welcome {user.userData?.email}</Text>
    </View>
  );
};
