import React, { useContext, useState } from 'react';
import { Text } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useCallback } from 'react';
import DatabaseContext from '../../../contexts/DatabaseContext';
import { VotingScreen } from './VotingScreen';
import { InviteScreen } from './InviteScreen';
import {
  DinnerFirebase,
  DinnerState,
  UserFirebase,
} from '../../../interfaces/FirebaseSchema';
import { fetchDinner } from '../../../utils/dinnerRequests';
import { fetchUsers } from '../../../utils/userRequests';
import { useUserContext } from '../../../contexts/UserContext';
import { WinnerScreen } from './WinnerScreen';

export type DinnerDetailScreenParams = {
  id: string;
};

export const DinnerDetailScreen = () => {
  const route = useRoute();
  const params = route.params as DinnerDetailScreenParams;

  const db = useContext(DatabaseContext).database;
  const user = useUserContext().currentUser;
  const [dinner, setDinner] = useState<DinnerFirebase>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [participants, setParticipants] = useState<UserFirebase[]>([]);

  // fetch dinner details here
  const resolveDinner = async () => {
    try {
      const fetchedDinner = await fetchDinner(db, params.id);

      // if current user is admin of dinner
      if (`Users/${user?.uid}` === fetchedDinner?.admin.path) setIsAdmin(true);
      setDinner(fetchedDinner);
      return fetchedDinner;
    } catch (error) {
      console.log(error);
    }
  };

  const resolveParticipants = async (dinner: DinnerFirebase) => {
    setParticipants(await fetchUsers(db, dinner.participants));
  };

  // refetch dinners on focus screen
  useFocusEffect(
    useCallback(() => {
      resolveDinner().then(fetchedDinner => { 
        if (fetchedDinner) {
          resolveParticipants(fetchedDinner)
        } else {
          throw new Error("dinner was not fetched correctly!")
        }
      });
    }, []),
  );

  // get state
  const state: DinnerState = dinner?.state ?? DinnerState.LOADING;

  if (!dinner) return <Text>Loading...</Text>;

  switch (state) {
    case DinnerState.INVITE:
      return <InviteScreen dinner={dinner} isAdmin={isAdmin} />;
    case DinnerState.VOTING:
      return <VotingScreen isAdmin={isAdmin} dinner={dinner} participants={participants ?? []} />;
    case DinnerState.COOKING:
      return <WinnerScreen isAdmin={isAdmin} dinner={dinner} participants={participants ?? []}  />
    case DinnerState.FINISHED:
      return <Text>Already Finished.</Text>;
    case DinnerState.LOADING:
    default:
      return <Text>Loading...</Text>;
  }
};
