import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { ChipList } from '../../components/ChipList';
import { Frame } from '../../components/Frame';
import { SelectableListEntry } from '../../components/SelectableList';
import { UserImage } from '../../components/UserImage';
import DatabaseContext from '../../contexts/DatabaseContext';
import { useUserContext } from '../../contexts/UserContext';
import { colors } from '../../styles/Color';
import { spacing } from '../../styles/Spacing';
import { typography } from '../../styles/Typography';
import { EatingPreferenceType } from '../preferences/AddEatingPreferenceScreen';

export const SettingScreen = () => {
  const userContext = useUserContext();
  const dbContext = useContext(DatabaseContext);
  const db = dbContext.database;
  const navigator = useNavigation();

  const [username, setUsername] = useState<string>('Username');
  const [image, setImage] = useState<string>();
  const [allergies, setAllergies] = useState<SelectableListEntry[]>([]);
  const [diets, setDiets] = useState<SelectableListEntry[]>([]);
  const [unwantedIngredients, setUnwantedIngredients] = useState<
    SelectableListEntry[]
  >([]);

  const eatingPreferences = [
    {
      title: EatingPreferenceType.allergies,
      items: allergies,
    },
    {
      title: EatingPreferenceType.diets,
      items: diets,
    },
    {
      title: EatingPreferenceType.unwantedIngredients,
      items: unwantedIngredients,
    },
  ];

  const toggleUsernamePage = () => {
    if (!userContext.userDetails) throw new Error('user not authenticated');

    navigator.navigate('EditUsername', {
      userId: userContext.userDetails.id,
      name: userContext.userDetails.name,
    });
  };

  const togglePreferencesPage = (index: number) => {
    navigator.navigate('AddEatingPreferences', {
      type: eatingPreferences[index].title,
      preselectedItems: eatingPreferences[index].items,
    });
  };

  useEffect(() => {
    if (!userContext.userDetails) throw new Error('user not authenticated');

    setUsername(userContext.userDetails.name);
    setImage(userContext.userDetails.imageUrl);
    setAllergies(
      userContext.userDetails.allergies.map(item => ({
        id: item,
        label: item,
      })),
    );
    setDiets(
      userContext.userDetails.diets.map(item => ({
        id: item,
        label: item,
      })),
    );
    setUnwantedIngredients(
      userContext.userDetails.unwantedIngredients.map(item => ({
        id: item,
        label: item,
      })),
    );
  }, [userContext.userDetails]);

  return (
    <Frame withBottomNavBar>
      <Text style={[typography.h3]}>Profile</Text>
      <ScrollView>
        <View style={styles.userDetailsWrapper}>
          <UserImage
            customSize={120}
            imageUrl={image}
            name={username}></UserImage>
          <Pressable
            style={styles.usernameWrapper}
            onPress={toggleUsernamePage}>
            <Text style={[typography.h4, styles.username]}>{username}</Text>
            <Text style={[typography.body]}>
              {userContext.currentUser?.email}
            </Text>
          </Pressable>
        </View>
        <View style={styles.divider} />
        {eatingPreferences.map((preference, index) => (
          <View key={preference.title}>
            <Text style={[typography.subtitle2]}>{preference.title}</Text>
            <Text>Specify all your {preference.title.toLowerCase()}</Text>
            <ChipList
              items={preference.items}
              onPress={() => {}}
              onAdd={() => togglePreferencesPage(index)}
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
  usernameWrapper: {
    alignItems: 'center',
  },
  username: {
    marginTop: spacing.l,
    marginBottom: spacing.xxs,
  },
  divider: {
    borderBottomColor: colors.shadow,
    borderBottomWidth: 1,
    marginBottom: spacing.l,
  },
  label: {
    marginBottom: spacing.s,
  },
});
