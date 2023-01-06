import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SelectableListItem } from './SelectableListItem';

type SelectableListProps = {
    values: string[];
    isSelectable: boolean;
    selectedValues?: string[];
    onSelectionChanged?: (value: string) => void;
    style?: object;
};

export const SelectableList = ({
    values,
    isSelectable,
    selectedValues = [],
    onSelectionChanged = () => { },
    ...others
}: SelectableListProps) => {
    return (
        < ScrollView {...others} >
            {
                values.map(value => {
                    return (
                        <SelectableListItem
                            label={value}
                            key={value}
                            isChecked={selectedValues.includes(value)}
                            onValueChanged={() => onSelectionChanged(value)}
                            shouldRenderCheckbox={isSelectable}></SelectableListItem>
                    );
                })
            }
        </ScrollView >
    );
};
