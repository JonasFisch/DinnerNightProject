import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
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
  InviteState,
  UserFirebase,
} from '../../../interfaces/FirebaseSchema';
import { spacing } from '../../../styles/Spacing';
import {
  leaveDinner,
  loadRecipesForDinner,
} from '../../../utils/dinnerRequests';
import { fetchUsers } from '../../../utils/userRequests';

type DinnerProps = {
  dinner: DinnerFirebase;
  isAdmin: boolean;
};

export const InviteScreen = (props: DinnerProps) => {
  const navigator = useNavigation();
  const db = useContext(DatabaseContext).database;
  const userDetails = useUserContext().userDetails;
  const [participants, setParticipants] = useState<UserFirebase[]>([]);
  const [inviteStates, setInviteStates] = useState<Record<string, InviteState>>(
    {},
  );

  const noMorePendingInvites = () => {
    const res = Object.values(inviteStates).filter(
      element => element == InviteState.PENDING,
    );
    return res.length == 0;
  };

  useEffect(() => {
    setInviteStates(props.dinner.inviteStates);
    const fetchParticipants = async () => {
      const participants = await fetchUsers(db, props.dinner.participants);
      setParticipants(participants);
    };

    fetchParticipants().catch(console.error);
  }, [props.dinner]);

  // current user leaves dinner
  const leaveDinnerSelf = () => {
    leaveDinner(db, props.dinner.id, userDetails?.id);

    setTimeout(() => {
      navigator.goBack();
    }, 200);
  };

  const loadRecipeProposals = async () => {
    if (!noMorePendingInvites()) return;
    participants
      .filter(user => inviteStates[user.id] == InviteState.REJECTED)
      .forEach(
        async participant =>
          await leaveDinner(db, props.dinner.id, participant.id),
      );
    await loadRecipesForDinner(db, props.dinner, participants ?? []);
  };

  return (
    <Frame withBottomNavBar={false} withSubPageHeader>
      {props.isAdmin ? (
        <View style={{ flex: 1 }}>
          <Text style={[typography.subtitle2, { marginBottom: spacing.s }]}>
            Participants
          </Text>
          <Text>
            An invitation to your dinner was send to all participants. Once they
            accept the invite, you can start loading recipe proposals, that fit
            all participants eating preferences
          </Text>
          <ScrollView style={{ marginVertical: spacing.m }}>
            {participants
              .filter(p => p.id !== userDetails?.id)
              .map(participant => (
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
            onPress={loadRecipeProposals}
            disabled={!noMorePendingInvites()}
          />
        </View>
      ) : (
        <View>
          <Text style={typography.body}>
            You joined the Dinner! Once all other participants have accepted
            their invitation, the owner of this dinner will start loading recipe
            proposals!
          </Text>
          <InviteGrafic width={'100%'}></InviteGrafic>
          <AppButton
            title="LEAVE DINNER"
            type={AppButtonType.text}
            onPress={() => leaveDinnerSelf()}></AppButton>
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
