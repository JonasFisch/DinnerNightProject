import React, { useCallback, useContext, useRef, useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Frame } from '../../../components/Frame';
import { InviteStatus } from '../../../components/InviteStatus';
import InviteGrafic from '../../../assets/graphics/invited.svg';
import { AppButton } from '../../../components/Button';
import { AppButtonType } from '../../../interfaces/Button';
import { typography } from '../../../styles/Typography';
import { BottomSheet, BottomSheetRef } from 'react-native-sheet';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import DatabaseContext from '../../../contexts/DatabaseContext';
import { useUserContext } from '../../../contexts/UserContext';
import {
  collection,
  DocumentReference,
  Firestore,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import {
  DinnerFirebase,
  UserFirebase,
} from '../../../interfaces/FirebaseSchema';
import { spacing } from '../../../styles/Spacing';
import { leaveDinner } from '../../../utils/dinnerRequests';
import { fetchUsers } from '../../../utils/userRequests';

type DinnerProps = {
  dinner: DinnerFirebase;
  isAdmin: boolean;
};

export const InviteScreen = (props: DinnerProps) => {
  const navigator = useNavigation();
  const bottomSheet = useRef<BottomSheetRef>(null);
  const db = useContext(DatabaseContext).database;
  const userDetails = useUserContext().userDetails;
  const [participants, setParticipants] = useState<UserFirebase[]>([]);
  const inviteStates = props.dinner.inviteStates;

  const fetchParticipants = async () => {
    const participants = await fetchUsers(db, props.dinner.participants);
    setParticipants(participants);
  };

  useFocusEffect(
    useCallback(() => {
      fetchParticipants();
    }, []),
  );

  // current user leaves dinner
  const leaveDinnerSelf = () => {
    bottomSheet.current?.hide();

    leaveDinner(db, props.dinner.id, userDetails?.id);

    setTimeout(() => {
      navigator.goBack();
    }, 200);
  };

  return (
    <Frame withBottomNavBar={false} withSubPageHeader>
      {props.isAdmin ? (
        <View style={{ height: '100%' }}>
          <Text style={[typography.subtitle2, { marginBottom: spacing.s }]}>
            Participants
          </Text>
          <ScrollView>
            <Text style={{ marginBottom: spacing.m }}>
              An invitation to your dinner was send to all participants. Once
              they accept the invite, you can start loading recipe proposals,
              that fit all participants eating preferences.
            </Text>
            {participants.map(participant => (
              <InviteStatus
                dinnerID={props.dinner.id ?? ''}
                inviteState={inviteStates[participant.id]}
                participant={participant}
                key={participant.id}
                onRevertInvite={() =>
                  leaveDinner(db, props.dinner.id, participant.id)
                }
              />
            ))}
          </ScrollView>
          <AppButton
            title="LOAD RECEPIE PROPOSALS"
            type={AppButtonType.primary}
          />
        </View>
      ) : (
        <View>
          <Text style={typography.body}>
            You joined the Dinner! Once all other participants have accepted
            their invitation, the Owner of this Dinner will start loading recipe
            proposals!
          </Text>
          <InviteGrafic width={'100%'}></InviteGrafic>
          <AppButton
            title="LEAVE DINNER"
            type={AppButtonType.text}
            onPress={() => bottomSheet.current?.show()}></AppButton>
          <BottomSheet height={125} ref={bottomSheet}>
            <View style={style.bottomSheetView}>
              <AppButton
                title="LEAVE DINNER"
                type={AppButtonType.text}
                onPress={() => leaveDinnerSelf()}
              />
            </View>
          </BottomSheet>
        </View>
      )}
    </Frame>
  );
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
