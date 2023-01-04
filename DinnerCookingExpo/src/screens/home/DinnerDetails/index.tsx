import React, {useContext, useState} from 'react';
import {View, Text} from 'react-native';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {useCallback} from 'react';
import DatabaseContext from '../../../contexts/DatabaseContext';
import {CookingScreen} from './CookingScreen';
import {VotingScreen} from './VotingScreen';
import {InviteScreen} from './InviteScreen';
import UserContext from '../../../contexts/UserContext';
import { DinnerFirebase, DinnerState } from '../../../interfaces/FirebaseSchema';
import { fetchDinner } from '../../../utils/dinnerRequests';

export type DinnerDetailScreenParams = {
  id: string;
};

export const DinnerDetailScreen = () => {
  const route = useRoute();
  const params = route.params as DinnerDetailScreenParams;

  const db = useContext(DatabaseContext).database;
  const user = useContext(UserContext).userData;
  const [dinner, setDinner] = useState<DinnerFirebase>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // fetch dinner details here
  const resolveDinner = async () => {
    try {
      const fetchedDinner = await fetchDinner(db, params.id)
      
      // if current user is admin of dinner
      if (`Users/${user?.uid}` === fetchedDinner?.admin.path) setIsAdmin(true);

      setDinner(fetchedDinner);
    } catch (error) {
      console.log(error);
    }
  };

  // refetch dinners on focus screen
  useFocusEffect(
    useCallback(() => {
      resolveDinner();
    }, []),
  );  

  // get state
  const state: DinnerState = dinner?.state ?? DinnerState.LOADING;

  if (!dinner) return <Text>Loading...</Text>;

  switch (state) {
    case DinnerState.INVITE:
      return <InviteScreen dinner={dinner} isAdmin={isAdmin}></InviteScreen>;
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
};
