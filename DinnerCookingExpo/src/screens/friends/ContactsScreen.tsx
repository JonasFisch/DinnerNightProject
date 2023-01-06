import React from 'react';
import { Text } from 'react-native';
import { AppButton } from '../../components/Button';
import { AppButtonType } from '../../interfaces/Button';
import AddIcon from '../../assets/icons/add-material.svg';
import { useNavigation } from '@react-navigation/native';
import { Frame } from '../../components/Frame';
import { typography } from '../../styles/Typography';
import { spacing } from '../../styles/Spacing';


export const ContactsScreen = () => {
  const navigator = useNavigation();

  const addContacts = () => {
    navigator.navigate('AddContacts');
  };

  return (
    <Frame>
      <Text style={[typography.h3, { marginBottom: spacing.l }]}>Contacts</Text>
      <AppButton
        onPress={addContacts}
        title="add contacts"
        type={AppButtonType.primary}
        logoSVG={AddIcon}
        widthFitContent={true}
      />
    </Frame>
  );
};
