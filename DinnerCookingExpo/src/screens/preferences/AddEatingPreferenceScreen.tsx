import React, { useContext } from 'react';
import { SearchPage } from '../../components/SearchPage';
import { useUserContext } from '../../contexts/UserContext';
import DatabaseContext from '../../contexts/DatabaseContext';
import {
  setAllergiesOfUser,
  setDietsOfUser,
  setUnwantedIngredientsOfUser,
} from '../../utils/userRequests';
import { SelectableListEntry } from '../../components/SelectableList';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import ParamList from '../../utils/ParameterDefinitions';

export enum EatingPreferenceType {
  allergies = 'Allergies',
  diets = 'Diets',
  unwantedIngredients = 'Unwanted Ingredients',
}

export const AddEatingPreferenceScreen = () => {
  const route = useRoute<RouteProp<ParamList, 'AddEatingPreferenceScreen'>>();
  const preferenceType: EatingPreferenceType = route.params.type;
  const preselectedItems: SelectableListEntry[] = route.params.preselectedItems;
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

  const dietsList: SelectableListEntry[] = [
    { id: 'vegan', label: 'vegan' },
    { id: 'vegetarian', label: 'vegetarian' },
    { id: 'low carb', label: 'low carb' },
    { id: 'paleo', label: 'paleo' },
    { id: 'sugar free', label: 'sugar free' },
    { id: 'gluten free', label: 'gluten free' },
    { id: 'lactose free', label: 'lactose free' },
  ];

  const unwantedIngredientsList: SelectableListEntry[] = [
    { id: 'nuts', label: 'nuts' },
    { id: 'garlic', label: 'garlic' },
    { id: 'onions', label: 'onions' },
    { id: 'parsley', label: 'parsley' },
    { id: 'coriander', label: 'coriander' },
    { id: 'fish', label: 'fish' },
    { id: 'wheat', label: 'wheat' },
    { id: 'cheese', label: 'cheese' },
  ];

  const config: {
    [key in EatingPreferenceType]: {
      allOptions: SelectableListEntry[];
      onSave: (userId: string, items: string[]) => Promise<void>;
    };
  } = {
    [EatingPreferenceType.allergies]: {
      allOptions: allergiesList,
      onSave: (userId: string, items: string[]) =>
        setAllergiesOfUser(db, userId, items),
    },
    [EatingPreferenceType.diets]: {
      allOptions: dietsList,
      onSave: (userId: string, items: string[]) =>
        setDietsOfUser(db, userId, items),
    },
    [EatingPreferenceType.unwantedIngredients]: {
      allOptions: unwantedIngredientsList,
      onSave: (userId: string, items: string[]) =>
        setUnwantedIngredientsOfUser(db, userId, items),
    },
  };

  const onSaveAllergies = async (newItemsIds: string[]) => {
    const newItems: string[] = config[preferenceType].allOptions
      .filter(item => newItemsIds.includes(item.id))
      .map(item => item.label);
    try {
      if (!userContext.currentUser) throw new Error('User not authenticated.');
      config[preferenceType]
        .onSave(userContext.currentUser.uid, newItems)
        .then(() => {
          navigator.goBack();
        });
    } catch (error) {
      console.error(`error during saving ${preferenceType}: `, error);
    }
  };

  return (
    config[preferenceType].allOptions.length != 0 && (
      <SearchPage
        listItems={config[preferenceType].allOptions}
        selectedItems={preselectedItems.map(item => item.label)}
        onSave={onSaveAllergies}></SearchPage>
    )
  );
};
