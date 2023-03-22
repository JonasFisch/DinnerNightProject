import { useFocusEffect } from '@react-navigation/native';
import { DocumentReference } from 'firebase/firestore';
import React, { useCallback, useContext, useState } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import DatabaseContext from '../contexts/DatabaseContext';
import { useUserContext } from '../contexts/UserContext';
import { AppButtonType } from '../interfaces/Button';
import { InviteState, UserFirebase } from '../interfaces/FirebaseSchema';
import { colors } from '../styles/Color';
import { sizes } from '../styles/Sizes';
import { spacing } from '../styles/Spacing';
import { typography } from '../styles/Typography';
import { fetchSingleUser, fetchUsers } from '../utils/userRequests';
import { AppButton } from './Button';
import { Participants } from './Participants';
import CloseIcon from '../assets/icons/close.svg';
import CheckIcon from '../assets/icons/check.svg';
import { setInviteState } from '../utils/dinnerRequests';

type DinnerListItemProps = {
  id: string;
  title: string;
  creationDate: Date;
  ownerRef: DocumentReference;
  participantsRefs: DocumentReference[];
  inviteStates: Record<string, InviteState>;
  onPress: (data: string) => void;
};

export const DinnerListItem = (props: DinnerListItemProps) => {
  const [participants, setParticipants] = useState<UserFirebase[]>([]);
  const [owner, setOwner] = useState<UserFirebase>();
  const db = useContext(DatabaseContext).database;
  const userContext = useUserContext();

  const resolveParticipantsAndOwner = async () => {
    setParticipants(await fetchUsers(db, props.participantsRefs));
    setOwner(await fetchSingleUser(db, props.ownerRef));
  };

  const hasUserPendingInvitation = () => {
    if (!userContext.currentUser) throw new Error('User not authenticated');
    return (
      props.ownerRef.id != userContext.currentUser.uid &&
      props.inviteStates[userContext.currentUser.uid] == InviteState.PENDING
    );
  };

  const handleInviteDecision = async (newInviteStateOfUser: InviteState) => {
    if (!userContext.currentUser) throw new Error('User not authenticated');

    const newInviteStates = props.inviteStates;
    newInviteStates[userContext.currentUser.uid] = newInviteStateOfUser;
    await setInviteState(db, props.id, newInviteStates);
  };

  // fetch participants
  useFocusEffect(
    useCallback(() => {
      resolveParticipantsAndOwner();
    }, []),
  );

  const renderDinnerMainInformation = (
    <View style={styles.layoutContainer}>
      <View style={styles.textWrapper}>
        <Text style={[typography.body, { marginBottom: spacing.xs }]}>
          {props.title}
        </Text>
        <Text style={typography.body2}>
          {props.creationDate.toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </Text>
        {owner && <Text style={typography.body2}>Owner: {owner.name}</Text>}
      </View>
      <Participants participants={participants} />
    </View>
  );

  return hasUserPendingInvitation() ? (
    <Pressable
      style={styles.dinnerListItemWrapper}
      onPress={() => props.onPress(props.id)}>
      <View>
        <Text style={[typography.subtitle2, styles.inviteText]}>
          {owner ? owner.name : 'A friend'} invited you to a Dinner:
        </Text>
        {renderDinnerMainInformation}
        <View style={styles.buttonWrapper}>
          <AppButton
            type={AppButtonType.text}
            title="Reject"
            onPress={() => handleInviteDecision(InviteState.REJECTED)}
            logoSVG={CloseIcon}
            logoColor={colors.error}
          />
          <AppButton
            type={AppButtonType.text}
            title="Accept"
            onPress={() => handleInviteDecision(InviteState.ACCEPTED)}
            logoSVG={CheckIcon}
            logoColor={colors.success}
            logoAsTrailingIcon
          />
        </View>
      </View>
    </Pressable>
  ) : (
    <Pressable
      style={styles.dinnerListItemWrapper}
      onPress={() => props.onPress(props.id)}>
      {renderDinnerMainInformation}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  dinnerListItemWrapper: {
    borderColor: colors.textLight,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: sizes.borderRadius,
    padding: spacing.m,
  },
  layoutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textWrapper: {
    flex: 1,
    marginRight: spacing.s,
  },
  inviteText: {
    marginBottom: spacing.xs,
  },
  buttonWrapper: {
    marginTop: spacing.xs,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
