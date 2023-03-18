import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { AppButtonType } from '../interfaces/Button';
import { spacing } from '../styles/Spacing';
import { AppButton } from './Button';
import { Chip } from './Chip';
import AddIcon from '../assets/icons/add.svg';
import { SelectableListEntry } from './SelectableList';

type ChipListProps = {
  items: SelectableListEntry[];
  onPress: (item: SelectableListEntry) => void;
  withAvatar?: boolean;
  withAddButton?: boolean;
  onAdd?: () => void;
};

export const ChipList = ({
  items,
  onPress,
  withAvatar = false,
  withAddButton = false,
  onAdd = () => {},
}: ChipListProps) => {
  const [renderItems, setRenderItems] = useState<string[]>(
    items.map(e => e.label),
  );

  const addButton = (
    <AppButton
      key={'addButton'}
      type={AppButtonType.primary}
      title="save"
      iconOnly
      onPress={onAdd}
      logoSVG={AddIcon}
      style={styles.button}
    />
  );

  const renderChip = (item: string, index: number) => {
    if (item == 'addButtonToBeRendered') {
      return addButton;
    }

    return (
      <Chip
        key={index}
        label={item}
        onPress={() => onPress(items[index])}
        style={styles.chip}
        withAvatar
        imageUrl={items[index].image}
      />
    );
  };

  useEffect(() => {
    if (withAddButton) {
      setRenderItems([...items.map(e => e.label), 'addButtonToBeRendered']);
    } else {
      setRenderItems([...items.map(e => e.label)]);
    }
  }, [items]);

  return items.length > 0 ? (
    <View style={styles.itemWrapper}>{renderItems.map(renderChip)}</View>
  ) : (
    <View style={styles.noItemsWrapper}>{addButton}</View>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: spacing.s,
  },
  chip: {
    marginBottom: spacing.m,
  },
  button: {
    height: 40,
    width: 40,
  },
  noItemsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.s,
  },
});
