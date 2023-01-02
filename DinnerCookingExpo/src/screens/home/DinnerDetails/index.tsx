import React, {useContext, useState} from 'react';
import {View, Text} from 'react-native';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {useCallback} from 'react';
import {fetchDinnerDetails} from '../../../utils/dinners/fetchDinnerDetails';
import DatabaseContext from '../../../contexts/DatabaseContext';
import {Dinner, DinnerState} from '../../../interfaces/Dinner';
import {CookingScreen} from './CookingScreen';
import {VotingScreen} from './VotingScreen';
import {InviteScreen} from './InviteScreen';

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

  // get state
  const state: DinnerState = dinner?.state ?? DinnerState.LOADING;
  console.log(state);

  if (!dinner) return <Text>Loading...</Text>;

  switch (state) {
    case DinnerState.INVITE:
      return <InviteScreen dinner={dinner} isAdmin={true}></InviteScreen>;
    case DinnerState.VOTING:
      return <VotingScreen></VotingScreen>;
    case DinnerState.COOKING:
      return <CookingScreen></CookingScreen>;
    case DinnerState.FINISHED:
      return <Text>Already Finished.</Text>;
    case DinnerState.LOADING:
    default:
      return <Text>Loading...</Text>;
  }

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
