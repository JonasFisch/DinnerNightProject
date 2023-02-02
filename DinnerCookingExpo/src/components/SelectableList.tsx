import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { SelectableListItem } from './SelectableListItem';

export type SelectableListEntry = {
  id: string;
  label: string;
  image?: string;
};

type SelectableListProps = {
  items: SelectableListEntry[];
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
  const [filteredItems, setFilteredItems] = React.useState<string[]>(
    items.map(item => item.label),
  );

  useEffect(() => {
    let searchedItems = items
      .filter(item =>
        item.label.toLowerCase().startsWith(searchPhrase.toLowerCase()),
      )
      .map(item => item.label);
    setFilteredItems([...searchedItems]);
  }, [searchPhrase, items]);

  const renderItem = ({ item }: { item: string }) => (
    <SelectableListItem
      label={item}
      isChecked={selectedItems.includes(item)}
      onValueChanged={() => onSelectionChanged(item)}
      shouldRenderCheckbox={isSelectable}
      imgUrl={items.filter(i => i.label == item)[0].image}
    />
  );
  return <FlatList data={filteredItems} renderItem={renderItem} />;
};
