import React from 'react';
import { Text } from 'react-native';
import { AppButton } from '../../components/Button';
import { AppButtonType } from '../../interfaces/Button';
import AddIcon from '../../assets/icons/add-material.svg';
import { useNavigation } from '@react-navigation/native';
import { Frame } from '../../components/Frame';
import { typography } from '../../styles/Typography';
import { spacing } from '../../styles/Spacing';
import { SelectableList } from '../../components/SelectableList';


export const ContactsScreen = () => {
  const navigator = useNavigation();

  const addContacts = () => {
    navigator.navigate('AddContacts');
  };

  const listValues = ["Sabine", "Max", "Jonas"];
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  const handleToggle = (value: string) => {
    const isValueAlreadySelected = selectedValues.includes(value);
    let newSelectedValues = [...selectedValues];

    if (isValueAlreadySelected) {
      newSelectedValues = newSelectedValues.filter(element => element !== value);
    } else {
      newSelectedValues.push(value);
    }

    setSelectedValues(newSelectedValues);
  };


  return (
    <Frame>
      <Text style={[typography.h3, { marginBottom: spacing.l }]}>Contacts</Text>
      <SelectableList values={listValues} isSelectable={true} selectedValues={selectedValues} onSelectionChanged={handleToggle}></SelectableList>
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
