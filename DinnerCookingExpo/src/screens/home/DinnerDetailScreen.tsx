import React, {useContext, useState} from 'react';
import {View, Text} from 'react-native';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {useCallback} from 'react';
import {fetchDinnerDetails} from '../../utils/dinners/fetchDinnerDetails';
import DatabaseContext from '../../contexts/DatabaseContext';
import {Dinner} from '../../interfaces/Dinner';

export type DinnerDetailScreenParams = {
  id: string;
};

export const DinnerDetailScreen = () => {
  const route = useRoute();
  const params = route.params as DinnerDetailScreenParams;

  const db = useContext(DatabaseContext).database;
  const [dinner, setDinner] = useState<Dinner>();

  // fetch dinner details here
  const fetchDinner = async () => {
    try {
      setDinner(await fetchDinnerDetails(db, params.id));
    } catch (error) {
      console.log(error);
    }
  };

  // refetch dinners on focus screen
  useFocusEffect(
    useCallback(() => {
      fetchDinner();
    }, []),
  );

  // TODO: show screen depending on current state and in these views show admin / user view! use switch case here
  // switch (key) {
  //   case value:
  //     break;

  //   default:
  //     break;
  // }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Dinner Detail Screen for Dinner with id of: {params.id}</Text>
      {dinner ? (
        <>
          <Text>Dinner Name: {dinner.name}</Text>
          <Text>Dinner Date: {dinner.date.toString()}</Text>
        </>
      ) : null}
    </View>
  );
};
