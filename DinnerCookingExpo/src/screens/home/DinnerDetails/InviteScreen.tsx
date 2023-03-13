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

  // get invite states
  const fetchInviteStates = async () => {
    const participantIDs = props.dinner.participants.map(
      participant => participant.id,
    );

    // get states
    const participantsSnap = await getDocs(
      query(collection(db, 'Users'), where('__name__', 'in', participantIDs)),
    );

    // transform participant data!
    setParticipants(
      participantsSnap.docs.map(
        participant => {
          const data = participant.data() as UserFirebase;
          data.id = participant.id;
          return data;
        }
      ),
    );
  };

  useFocusEffect(
    useCallback(() => {
      fetchInviteStates();
    }, []),
  );

  // current user leaves dinner
  const leaveDinnerSelf = () => {
    // TODO: send request to Firebase
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
          <Text style={[typography.subtitle2, {marginBottom: spacing.s}]}>Participants</Text>
          <ScrollView>
            <Text style={{marginBottom: spacing.m}}>
              An invitation to your dinner was send to all participants. Once
              they accept the invite, you can start loading recipe proposals,
              that fit all participants eating preferences.
            </Text>
            {participants.map(participant => (
              <InviteStatus
                dinnerID={props.dinner.id ?? ''}
                participant={participant}
                key={participant.id}
                onRevertInvite={() => leaveDinner(db, props.dinner.id, participant.id)}
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
