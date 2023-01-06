import React from 'react';
import { View, Text } from 'react-native';
import { SearchPage } from '../../components/SearchPage';

export const AddContactsScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Add Contacts Screen</Text>
      <SearchPage></SearchPage>
    </View>
  );
};
