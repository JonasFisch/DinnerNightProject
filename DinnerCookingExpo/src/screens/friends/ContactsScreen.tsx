import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { AppButton } from '../../components/Button';
import { AppButtonType } from '../../interfaces/Button';
import AddIcon from '../../assets/icons/add-material.svg';
import { useNavigation } from '@react-navigation/native';
import { Frame } from '../../components/Frame';
import { typography } from '../../styles/Typography';
import { spacing } from '../../styles/Spacing';
import { SelectableList } from '../../components/SelectableList';
import { colors } from '../../styles/Color';

export const ContactsScreen = () => {
  const navigator = useNavigation();

  const addContacts = () => {
    navigator.navigate('AddContacts');
  };

  const contacts = [
    'Sabine Extralooooooooooooooooooooooooong',
    'Max Mustermann',
    'Jonas Test',
    'Faye Tester',
    'Saskia Bauer',
    'Oskar Lehmann',
    'Leonie Richter',
    'Tobias Der Erste von und zu überhaupt',
    'Sascha Meistermann',
    'Lenzi Eins',
    'Maximilian Mustermann',
    'Peter Hans KLaus Jung',
    'Bernd Brot',
  ];
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  const handleToggle = (value: string) => {
    const isValueAlreadySelected = selectedValues.includes(value);
    let newSelectedValues = [...selectedValues];

    if (isValueAlreadySelected) {
      newSelectedValues = newSelectedValues.filter(
        element => element !== value,
      );
    } else {
      newSelectedValues.push(value);
    }

    setSelectedValues(newSelectedValues);
  };

  return (
    <Frame withBottomNavBar={true}>
      <Text style={[typography.h3]}>Contacts</Text>
      <Text style={[typography.subtitle2, styles.contactCount]}>
        {contacts.length} Contacts
      </Text>
      <SelectableList
        values={contacts}
        isSelectable={true}
        selectedValues={selectedValues}
        onSelectionChanged={handleToggle}></SelectableList>
      <AppButton
        style={styles.addButton}
        onPress={addContacts}
        title="add contacts"
        type={AppButtonType.primary}
        logoSVG={AddIcon}
        widthFitContent={true}
      />
    </Frame>
  );
};

const styles = StyleSheet.create({
  contactCount: {
    marginVertical: spacing.s,
    color: colors.textLight,
  },
  addButton: {
    marginTop: spacing.m,
  },
});
