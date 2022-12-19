import React, {ReactNode, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors} from '../styles/Color';
import {typography} from '../styles/Typography';

type TabsProps = {
  tabViews: {node: ReactNode; title: string}[];
};

export const Tabs = (props: TabsProps) => {
  const [active, setActive] = useState<number>(0);

  const getActiveTextStyle = (index: number) => {
    return index === active ? styles.navigationButtonTextActive : null;
  };

  const getActiveButtonStyle = (index: number) => {
    return index === active ? styles.navigationButtonActive : null;
  };

  return (
    <View>
      <View style={styles.tabNavigation}>
        {props.tabViews.map((tab, index) => {
          return (
            <Pressable
              key={index}
              onPress={() => setActive(index)}
              style={[styles.navigationButton, getActiveButtonStyle(index)]}>
              <Text
                style={[
                  typography.subtitle2,
                  styles.navigationButtonText,
                  getActiveTextStyle(index),
                ]}>
                {tab.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <ScrollView style={styles.contentView}>
        {props.tabViews[active].node}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabNavigation: {
    flexDirection: 'row',
    width: '100%',
  },
  navigationButton: {
    width: '50%',
    borderBottomColor: colors.grey,
    borderBottomWidth: 2,
    borderStyle: 'solid',
    padding: 12,
  },
  navigationButtonActive: {
    borderBottomColor: colors.primary,
  },
  navigationButtonText: {
    textAlign: 'center',
    color: colors.textLight,
  },
  navigationButtonTextActive: {
    color: colors.text,
  },
  contentView: {
    paddingVertical: 19,
    overflow: 'scroll',
    height: '80%',
  },
});
