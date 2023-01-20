import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { SelectableListItem } from './SelectableListItem';

type SelectableListProps = {
  items: string[];
  searchPhrase?: string;
  isSelectable: boolean;
  selectedItems?: string[];
  onSelectionChanged?: (value: string) => void;
};

export const SelectableList = ({
  items,
  searchPhrase = '',
  isSelectable,
  selectedItems = [],
  onSelectionChanged = () => {},
}: SelectableListProps) => {
  const [filteredItems, setFilteredItems] = React.useState<string[]>(items);

  useEffect(() => {
    let searchedItems = items.filter(item =>
      item.toLowerCase().startsWith(searchPhrase.toLowerCase()),
    );
    setFilteredItems([...searchedItems]);
  }, [searchPhrase]);

  const renderItem = ({ item }: { item: string }) => (
    <SelectableListItem
      label={item}
      isChecked={selectedItems.includes(item)}
      onValueChanged={() => onSelectionChanged(item)}
      shouldRenderCheckbox={isSelectable}
    />
  );
  return <FlatList data={filteredItems} renderItem={renderItem} />;
};
