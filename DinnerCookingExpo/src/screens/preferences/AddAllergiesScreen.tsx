import React, { useContext, useState } from 'react';
import { SearchPage } from '../../components/SearchPage';
import { useUserContext } from '../../contexts/UserContext';
import DatabaseContext from '../../contexts/DatabaseContext';
import { setAllergiesOfUser } from '../../utils/userRequests';
import { SelectableListEntry } from '../../components/SelectableList';
import { useNavigation, useRoute } from '@react-navigation/native';

export const AddAllergiesScreen = ({ route }) => {
  // TODO: const route = useRoute()
  const { allergies }: { allergies: SelectableListEntry[] } = route.params;
  const userContext = useUserContext();
  const dbContext = useContext(DatabaseContext);
  const db = dbContext.database;
  const navigator = useNavigation();

  const allergiesList: SelectableListEntry[] = [
    { id: 'milk', label: 'milk' },
    { id: 'eggs', label: 'eggs' },
    { id: 'peanuts', label: 'peanuts' },
    { id: 'soybeans', label: 'soybeans' },
    { id: 'peas', label: 'peas' },
    { id: 'walnuts', label: 'walnuts' },
    { id: 'hazelnuts', label: 'hazelnuts' },
    { id: 'pecans', label: 'pecans' },
    { id: 'cashews', label: 'cashews' },
    { id: 'pistachios', label: 'pistachios' },
    { id: 'shellfish', label: 'shellfish' },
    { id: 'wheat', label: 'wheat' },
  ];

  const [allAllergies, setAllAllergies] =
    useState<SelectableListEntry[]>(allergiesList);

  const onSaveAllergies = async (newAllergieIds: string[]) => {
    const newAllergies: string[] = allAllergies
      .filter(item => newAllergieIds.includes(item.id))
      .map(item => item.label);
    try {
      if (!userContext.currentUser) throw new Error('User not authenticated.');
      await setAllergiesOfUser(
        db,
        userContext.currentUser.uid,
        newAllergies,
      ).then(() => {
        navigator.goBack();
      });
    } catch (error) {
      console.error('error during saving allergies: ', error);
    }
  };

  return (
    allAllergies.length != 0 && (
      <SearchPage
        listItems={allAllergies}
        selectedItems={allergies.map(item => item.label)}
        onSave={onSaveAllergies}></SearchPage>
    )
  );
};
