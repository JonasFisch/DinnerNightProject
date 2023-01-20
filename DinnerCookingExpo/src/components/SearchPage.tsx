import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SelectableList } from './SelectableList';
import { Frame } from './Frame';
import { AppInput } from './Input';
import { spacing } from '../styles/Spacing';
import { SelectableListItem } from './SelectableListItem';

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
  const [filteredUsers, setFilteredUsers] = React.useState(allUsers);
  const [searchPhrase, setSearchPhrase] = React.useState<string>('');

  useEffect(() => {
    let searchedUsers = allUsers.filter(username =>
      username.toLowerCase().startsWith(searchPhrase.toLowerCase()),
    );
    setFilteredUsers([...searchedUsers]);
  }, [searchPhrase]);

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

  const renderItem = ({ item }: { item: string }) => (
    <SelectableListItem
      label={item}
      isChecked={selectedValues.includes(item)}
      onValueChanged={() => handleToggle(item)}
      shouldRenderCheckbox={true}
    />
  );

  return (
    <Frame forSearchPage>
      <AppInput
        style={styles.searchInput}
        value={searchPhrase}
        onChangeText={setSearchPhrase}
        label={'Search'}
        clearable={true}></AppInput>
      <FlatList data={filteredUsers} renderItem={renderItem} />
    </Frame>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    marginBottom: spacing.s,
  },
});
