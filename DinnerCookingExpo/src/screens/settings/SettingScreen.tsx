import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ChipList } from '../../components/ChipList';
import { Frame } from '../../components/Frame';
import { UserImage } from '../../components/UserImage';
import DatabaseContext from '../../contexts/DatabaseContext';
import { useUserContext } from '../../contexts/UserContext';
import { colors } from '../../styles/Color';
import { spacing } from '../../styles/Spacing';
import { typography } from '../../styles/Typography';

export const SettingScreen = () => {
  const userContext = useUserContext();
  const dbContext = useContext(DatabaseContext);
  const db = dbContext.database;

  if (!userContext.userDetails) throw new Error('user not authenticated');

  const eatingPreferences = [
    {
      title: 'Allergies',
      items: userContext.userDetails.allergies.map(item => ({
        id: item,
        label: item,
      })),
    },
    {
      title: 'Diets',
      items: userContext.userDetails.diets.map(item => ({
        id: item,
        label: item,
      })),
    },
    {
      title: 'Unwanted Ingredients',
      items: userContext.userDetails.unwantedIngredients.map(item => ({
        id: item,
        label: item,
      })),
    },
  ];

  return (
    <Frame withBottomNavBar>
      <Text style={[typography.h3]}>Profile</Text>
      <ScrollView>
        <View style={styles.userDetailsWrapper}>
          <UserImage
            customSize={120}
            name={userContext.userDetails.name}></UserImage>
          <Text style={[typography.h4, styles.username]}>
            {userContext.userDetails.name}
          </Text>
          <Text style={[typography.body]}>
            {userContext.currentUser?.email}
          </Text>
        </View>
        <View style={styles.divider} />
        {eatingPreferences.map(preference => (
          <View style={styles.preferenceWrapper}>
            <Text style={[typography.subtitle2]}>{preference.title}</Text>
            <ChipList
              items={preference.items}
              onPress={() => {}}
              onAdd={() => {}}
              withAvatar
              withAddButton></ChipList>
          </View>
        ))}
      </ScrollView>
    </Frame>
  );
};

const styles = StyleSheet.create({
  userDetailsWrapper: {
    alignItems: 'center',
    marginVertical: spacing.l,
  },
  username: {
    marginTop: spacing.l,
    marginBottom: spacing.xxs,
  },
  divider: {
    borderBottomColor: colors.shadow,
    borderBottomWidth: 1,
  },
  label: {
    marginBottom: spacing.s,
  },
  preferenceWrapper: {
    marginTop: spacing.l,
  },
});
