import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  ViewBase,
  ScrollView,
} from 'react-native';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useCallback } from 'react';
import DatabaseContext from '../../../contexts/DatabaseContext';
import { VotingScreen } from './VotingScreen';
import { InviteScreen } from './InviteScreen';
import {
  DinnerFirebase,
  DinnerState,
  UserFirebase,
} from '../../../interfaces/FirebaseSchema';
import {
  deleteDinner,
  fetchDinner,
  leaveDinner,
} from '../../../utils/dinnerRequests';
import { fetchUsers } from '../../../utils/userRequests';
import { useUserContext } from '../../../contexts/UserContext';
import { WinnerScreen } from './WinnerScreen';
import ParamList from '../../../utils/ParameterDefinitions';
import MoreIcon from '../../../assets/icons/more.svg';
import DeleteIcon from '../../../assets/icons/delete.svg';
import EditIcon from '../../../assets/icons/edit.svg';
import LeaveIcon from '../../../assets/icons/leave.svg';

import { BottomSheet, BottomSheetRef } from 'react-native-sheet';
import { AppButton } from '../../../components/Button';
import { AppButtonType } from '../../../interfaces/Button';
import { spacing } from '../../../styles/Spacing';
import { colors } from '../../../styles/Color';

export type DinnerDetailScreenParams = {
  id: string;
};

export const DinnerDetailScreen = () => {
  const route = useRoute<RouteProp<ParamList, 'DinnerDetailScreen'>>();
  const id: string = route.params.id;
  const navigator = useNavigation();
  const bottomSheet = useRef<BottomSheetRef>(null);

  const db = useContext(DatabaseContext).database;
  const user = useUserContext().currentUser;
  const [dinner, setDinner] = useState<DinnerFirebase>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [participants, setParticipants] = useState<UserFirebase[]>([]);

  useEffect(() => {
    navigator.setOptions({
      headerRight: () => {
        return (
          <Pressable onPress={() => bottomSheet.current?.show()}>
            <MoreIcon />
          </Pressable>
        );
      },
      title: dinner?.name,
    });
  }, [isAdmin]);

  useEffect(() => {
    const unsubscribe = fetchDinner(db, id, (dinner: DinnerFirebase) => {
      setDinner(dinner);
      if (dinner) {
        resolveParticipants(dinner);
      } else {
        throw new Error('dinner was not fetched correctly!');
      }
      // if current user is admin of dinner
      if (`Users/${user?.uid}` === dinner?.admin.path) setIsAdmin(true);
    });

    userContext.setSnapshotSubscriptions([
      ...userContext.snapshotSubscriptions,
      unsubscribe,
    ]);

    return () => unsubscribe();
  }, []);

  const resolveParticipants = async (dinner: DinnerFirebase) => {
    setParticipants(await fetchUsers(db, dinner.participants));
  };

  const leaveDinnerSelf = () => {
    bottomSheet.current?.hide();

    leaveDinner(db, dinner?.id, user?.uid);

    setTimeout(() => {
      navigator.navigate('Dinners');
    }, 200);
  };

  const delDinner = () => {
    console.log('delete dinner!');
    deleteDinner(db, dinner?.id);

    navigator.navigate('Dinners');
  };

  const editDinner = () => {
    bottomSheet.current?.hide();

    console.log('edit dinner');
    navigator.navigate('CreateDinner', {
      dinner: dinner,
      participants: participants,
    });
  };

  // get state
  const state: DinnerState = dinner?.state ?? DinnerState.LOADING;
  let screen = null;

  if (!dinner) return <Text>Loading...</Text>;

  switch (state) {
    case DinnerState.INVITE:
      screen = <InviteScreen dinner={dinner} isAdmin={isAdmin} />;
      break;
    case DinnerState.VOTING:
      screen = (
        <VotingScreen
          isAdmin={isAdmin}
          dinner={dinner}
          participants={participants ?? []}
        />
      );
      break;
    case DinnerState.COOKING:
    case DinnerState.FINISHED:
      screen = (
        <WinnerScreen
          isAdmin={isAdmin}
          dinner={dinner}
          participants={participants ?? []}
        />
      );
      break;
    case DinnerState.LOADING:
    default:
      screen = <Text>Loading...</Text>;
      break;
  }

  return (
    <ScrollView>
      {screen}
      <BottomSheet height={200} ref={bottomSheet}>
        <View style={style.bottomSheetView}>
          {isAdmin ? (
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}>
              <AppButton
                title="EDIT DINNER"
                type={AppButtonType.text}
                logoSVG={EditIcon}
                logoColor={colors.primary}
                onPress={() => editDinner()}
              />
              <AppButton
                title="DELETE DINNER"
                type={AppButtonType.text}
                logoSVG={DeleteIcon}
                logoColor={colors.error}
                textStyle={{ color: colors.error }}
                onPress={() => delDinner()}
              />
            </View>
          ) : (
            <AppButton
              title="LEAVE DINNER"
              type={AppButtonType.text}
              logoSVG={LeaveIcon}
              logoColor={colors.primary}
              onPress={() => leaveDinnerSelf()}
            />
          )}
        </View>
      </BottomSheet>
    </ScrollView>
  );
  // </View>
};

const style = StyleSheet.create({
  bottomSheetView: {
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: spacing.l,
  },
});
