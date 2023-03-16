import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { AppButtonType } from '../interfaces/Button';
import { spacing } from '../styles/Spacing';
import { AppButton } from './Button';
import { Chip } from './Chip';
import AddIcon from '../assets/icons/add.svg';

type ChipListProps = {
  items: string[];
  onPress: (item: string) => void;
  withAvatar?: boolean;
  withAddButton?: boolean;
  onAdd?: () => void;
  emptyListText?: string;
};

export const ChipList = ({
  items,
  onPress,
  withAvatar = false,
  withAddButton = false,
  onAdd = () => {},
  emptyListText,
}: ChipListProps) => {
  const [renderItems, setRenderItems] = useState<string[]>(items);

  const addButton = (
    <AppButton
      type={AppButtonType.primary}
      title="save"
      iconOnly
      onPress={onAdd}
      logoSVG={AddIcon}
      style={styles.button}
    />
  );

  const renderChip = ({ item }: { item: string }) => {
    if (item == 'addButtonToBeRendered') {
      return addButton;
    }

    return <Chip label={item} onPress={() => onPress(item)} withAvatar />;
  };

  useEffect(() => {
    if (!withAddButton) return;
    setRenderItems([...items, 'addButtonToBeRendered']);
  }, []);

  return items.length != 0 && emptyListText ? (
    <FlatList
      data={renderItems}
      style={styles.selectedValuesList}
      contentContainerStyle={styles.listContentContainer}
      renderItem={renderChip}
      keyExtractor={item => item}
      horizontal
    />
  ) : (
    <View style={styles.noItemsWrapper}>{addButton}</View>
  );
};

const styles = StyleSheet.create({
  selectedValuesList: {
    marginVertical: spacing.xs,
    maxHeight: 50,
  },
  listContentContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
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
