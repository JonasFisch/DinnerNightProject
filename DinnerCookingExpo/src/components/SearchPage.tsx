import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SelectableList } from './SelectableList';
import { Frame } from './Frame';
import { AppInput } from './Input';
import { spacing } from '../styles/Spacing';
import { Chip } from './Chip';

export const SearchPage = () => {
  const allUsers = [
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
  const [searchPhrase, setSearchPhrase] = React.useState<string>('');

  const handleSelectionChange = (value: string) => {
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

  const renderChip = ({ item }: { item: string }) => (
    <Chip label={item} onPress={() => handleSelectionChange(item)} />
  );

  return (
    <Frame forSearchPage>
      <AppInput
        value={searchPhrase}
        onChangeText={setSearchPhrase}
        label={'Search'}
        clearable={true}></AppInput>
      {selectedValues.length != 0 && (
        <FlatList
          data={selectedValues}
          style={styles.selectedValuesList}
          contentContainerStyle={styles.listContentContainer}
          renderItem={renderChip}
          horizontal
        />
      )}

      <SelectableList
        items={allUsers}
        searchPhrase={searchPhrase}
        isSelectable={true}
        selectedItems={selectedValues}
        onSelectionChanged={handleSelectionChange}
      />
    </Frame>
  );
};

const styles = StyleSheet.create({
  selectedValuesList: {
    marginVertical: spacing.s,
  },
  listContentContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
});
