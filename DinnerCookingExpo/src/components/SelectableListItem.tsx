import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import CheckBox from 'expo-checkbox';
import { spacing } from '../styles/Spacing';
import { typography } from '../styles/Typography';
import { colors } from '../styles/Color';

type SelectableListItem = {
    label: string;
    isChecked: boolean;
    onValueChanged: () => void;
    shouldRenderCheckbox: boolean;
};

export const SelectableListItem = ({
    label,
    isChecked,
    onValueChanged,
    shouldRenderCheckbox,
}: SelectableListItem) => {
    return (
        <Pressable key={label} style={styles.container} onPress={onValueChanged}>
            <Text style={typography.body}>{label}</Text>
            {shouldRenderCheckbox && (
                <CheckBox value={isChecked} onValueChange={onValueChanged} color={colors.textLight} />
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.xxs,
        paddingVertical: spacing.s,
    }
});
