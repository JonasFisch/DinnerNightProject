import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SelectableList, SelectableListEntry } from './SelectableList';
import { Frame } from './Frame';
import { AppInput } from './Input';
import { spacing } from '../styles/Spacing';
import { Chip } from './Chip';
import { AppButton } from './Button';
import { AppButtonType } from '../interfaces/Button';
import CheckIcon from '../assets/icons/check.svg';

export const SearchPage = ({
  listItems,
  onSave,
  selectedItems,
}: {
  listItems: SelectableListEntry[];
  onSave: (contacts: string[]) => void;
  selectedItems: string[];
}) => {
  const [selectedValues, setSelectedValues] =
    React.useState<string[]>(selectedItems);
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

  const renderChip = ({ item }: { item: string }) => {
    const fullItem = listItems.find(el => el.label == item);
    return (
      <Chip
        label={item}
        imageUrl={fullItem?.image}
        onPress={() => handleSelectionChange(item)}
      />
    );
  };

  const saveContacts = () => {
    const currentlySelectedValues = listItems
      .filter(item => selectedValues.includes(item.label))
      .map(item => item.id);
    onSave(currentlySelectedValues);
  };

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
          keyExtractor={item => item}
          horizontal
        />
      )}
      <SelectableList
        items={listItems}
        searchPhrase={searchPhrase}
        isSelectable={true}
        selectedItems={selectedValues}
        onSelectionChanged={handleSelectionChange}
      />
      <AppButton
        type={AppButtonType.primary}
        title="save selection"
        iconOnly
        onPress={saveContacts}
        widthFitContent
        logoSVG={CheckIcon}
        style={styles.button}
      />
    </Frame>
  );
};

const styles = StyleSheet.create({
  selectedValuesList: {
    marginVertical: spacing.xs,
    minHeight: 50,
    maxHeight: 50,
  },
  listContentContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  button: {
    position: 'absolute',
    bottom: spacing.m,
    right: spacing.m,
  },
});
