import React, { useContext, useEffect } from 'react';
import { SearchPage } from '../../components/SearchPage';
import { useUserContext } from '../../contexts/UserContext';
import DatabaseContext from '../../contexts/DatabaseContext';
import {
  setAllergiesOfUser,
  setDietsOfUser,
  setUnwantedIngredientsOfUser,
} from '../../utils/userRequests';
import { SelectableListEntry } from '../../components/SelectableList';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
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
    { id: 'peanut', label: 'peanut' },
    { id: 'egg', label: 'egg' },
    { id: 'gluten', label: 'gluten' },
    { id: 'dairy', label: 'dairy' },
    { id: 'grain', label: 'grain' },
    { id: 'seafood', label: 'seafood' },
    { id: 'sesame', label: 'sesame' },
    { id: 'shellfish', label: 'shellfish' },
    { id: 'soy', label: 'soy' },
    { id: 'wheat', label: 'wheat' },
  ];

  const dietsList: SelectableListEntry[] = [
    { id: 'vegan', label: 'vegan' },
    { id: 'vegetarian', label: 'vegetarian' },
    { id: 'gluten free', label: 'gluten free' },
    { id: 'dairy free', label: 'dairy free' },
    { id: 'ketogenic', label: 'ketogenic' },
    { id: 'primal', label: 'primal' },
    { id: 'pescetarian', label: 'pescetarian' },
    { id: 'whole 30', label: 'whole 30' },
  ];

  const unwantedIngredientsList: SelectableListEntry[] = [
    { id: 'parsley', label: 'parsley' },
    { id: 'coriander', label: 'coriander' },
    { id: 'dill', label: 'dill' },
    { id: 'chili', label: 'chili' },
    { id: 'garlic', label: 'garlic' },
    { id: 'onions', label: 'onions' },
    { id: 'olive', label: 'olive' },
    { id: 'anchovies', label: 'anchovies' },
    { id: 'mushroom', label: 'mushroom' },
    { id: 'fish', label: 'fish' },
    { id: 'cheese', label: 'cheese' },
    { id: 'coconut', label: 'coconut' },
    { id: 'dates', label: 'dates' },
    { id: 'beer', label: 'beer' },
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

  const onSave = async (newItemsIds: string[]) => {
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

  useEffect(() => {
    navigator.setOptions({
      title: `${preferenceType}`,
    });
  }, []);

  return (
    config[preferenceType].allOptions.length != 0 && (
      <SearchPage
        listItems={config[preferenceType].allOptions}
        selectedItems={preselectedItems.map(item => item.label)}
        onSave={onSave}></SearchPage>
    )
  );
};
