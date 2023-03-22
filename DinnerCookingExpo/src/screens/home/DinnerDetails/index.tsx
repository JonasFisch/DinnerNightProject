import React, { useContext, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
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
import ParamList from '../../../utils/ParameterDefinitions';

export type DinnerDetailScreenParams = {
  id: string;
};

export const DinnerDetailScreen = () => {
  const route = useRoute<RouteProp<ParamList, 'DinnerDetailScreen'>>();
  const id: string = route.params.id;

  const db = useContext(DatabaseContext).database;
  const user = useUserContext().currentUser;
  const [dinner, setDinner] = useState<DinnerFirebase>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [participants, setParticipants] = useState<UserFirebase[]>([]);

  
  useEffect(() => {
    const unsubscribe = fetchDinner(db, id, (dinner: DinnerFirebase) => {
      console.log(dinner.name);
      setDinner(dinner)
      if (dinner) {
        resolveParticipants(dinner);
      } else {
        throw new Error('dinner was not fetched correctly!');
      }
      // if current user is admin of dinner
      if (`Users/${user?.uid}` === dinner?.admin.path) setIsAdmin(true);
    })
    
    return () => unsubscribe();
  }, [])

  const resolveParticipants = async (dinner: DinnerFirebase) => {
    setParticipants(await fetchUsers(db, dinner.participants));
  };

  // get state
  const state: DinnerState = dinner?.state ?? DinnerState.LOADING;

  if (!dinner) return <Text>Loading...</Text>;

  switch (state) {
    case DinnerState.INVITE:
      return <InviteScreen dinner={dinner} isAdmin={isAdmin} />;
    case DinnerState.VOTING:
      return (
        <VotingScreen
          isAdmin={isAdmin}
          dinner={dinner}
          participants={participants ?? []}
        />
      );
    case DinnerState.COOKING:
      return (
        <WinnerScreen
          isAdmin={isAdmin}
          dinner={dinner}
          participants={participants ?? []}
        />
      );
    case DinnerState.FINISHED:
      return <Text>Already Finished.</Text>;
    case DinnerState.LOADING:
    default:
      return <Text>Loading...</Text>;
  }
};
