import React from 'react';
import { View } from 'react-native';
import { SelectableListItem } from './SelectableListItem';

type SelectableListProps = {
    values: string[];
    isSelectable: boolean;
    selectedValues?: string[];
    onSelectionChanged?: (value: string) => void;
};

export const SelectableList = ({
    values,
    isSelectable,
    selectedValues = [],
    onSelectionChanged = () => { },
}: SelectableListProps) => {
    return (
        <View>
            {values.map(value => {
                return (
                    <SelectableListItem
                        label={value}
                        isChecked={selectedValues.includes(value)}
                        onValueChanged={() => onSelectionChanged(value)}
                        shouldRenderCheckbox={isSelectable}></SelectableListItem>
                );
            })}
        </View>
    );
};
