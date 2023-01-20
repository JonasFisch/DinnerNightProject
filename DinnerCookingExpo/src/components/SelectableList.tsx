import React from 'react';
import { StyleSheet, ScrollView, FlatList, Text } from 'react-native';
import { SelectableListItem } from './SelectableListItem';

type SelectableListProps = {
  values: string[];
  searchPhrase?: string;
  isSelectable: boolean;
  selectedValues?: string[];
  onSelectionChanged?: (value: string) => void;
  style?: object;
};

export const SelectableList = ({
  values,
  searchPhrase = '',
  isSelectable,
  selectedValues = [],
  onSelectionChanged = () => {},
  ...others
}: SelectableListProps) => {
  const [filteredValues, setFilteredValues] = React.useState<string[]>(values);
  /*const renderItem = ({ item }: { item: string }) => {
    console.log(searchPhrase, item);
    console.log(item.toLowerCase().startsWith(searchPhrase.toLowerCase()));
    // when no searchPhrase, show all values
    if (searchPhrase === '') {
      return (
        <SelectableListItem
          label={item}
          key={item}
          isChecked={selectedValues.includes(item)}
          onValueChanged={() => onSelectionChanged(item)}
          shouldRenderCheckbox={isSelectable}
        />
      );
    }
    // filter item
    if (item.toLowerCase().startsWith(searchPhrase.toLowerCase())) {
      return (
        <SelectableListItem
          label={item}
          key={item}
          isChecked={selectedValues.includes(item)}
          onValueChanged={() => onSelectionChanged(item)}
          shouldRenderCheckbox={isSelectable}
        />
      );
    }
    return null;
  };*/
  const filterValues = () => {
    setFilteredValues(
      values.filter(value =>
        value.toLowerCase().startsWith(searchPhrase.toLowerCase()),
      ),
    );
  };

  const renderItem = ({ item }: { item: string }) => (
    <SelectableListItem
      label={item}
      key={item}
      isChecked={selectedValues.includes(item)}
      onValueChanged={() => onSelectionChanged(item)}
      shouldRenderCheckbox={isSelectable}
    />
  );
  return (
    <FlatList
      data={filteredValues}
      renderItem={renderItem}
      keyExtractor={item => item}
    />
  );
};
