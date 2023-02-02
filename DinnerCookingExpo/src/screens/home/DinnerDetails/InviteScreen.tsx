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
import UserContext from '../../../contexts/UserContext';
import {
  collection,
  collectionGroup,
  DocumentSnapshot,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import {
  DinnerFirebase,
  UserFirebase,
} from '../../../interfaces/FirebaseSchema';
import { spacing } from '../../../styles/Spacing';

type DinnerProps = {
  dinner: DinnerFirebase;
  isAdmin: boolean;
};

export const InviteScreen = (props: DinnerProps) => {
  const navigator = useNavigation();
  const bottomSheet = useRef<BottomSheetRef>(null);
  const db = useContext(DatabaseContext).database;
  const userDetails = useContext(UserContext).userDetails;
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
        participant => participant.data() as UserFirebase,
      ),
    );
  };

  useFocusEffect(
    useCallback(() => {
      fetchInviteStates();
    }, []),
  );

  // leaves the dinner
  const leaveDinner = () => {
    // TODO: send request to Firebase
    bottomSheet.current?.hide();

    setTimeout(() => {
      navigator.goBack();
    }, 200);
  };

  return (
    <Frame withBottomNavBar={false} withSubPageHeader>
      {props.isAdmin ? (
        <View style={{ height: '100%' }}>
          <Text style={typography.subtitle2}>Participants</Text>
          <ScrollView>
            <Text>
              An invitation to your dinner was send to all participants. Once
              they accept the invite, you can start loading recipe proposals,
              that fit all participants eating preferences.
            </Text>
            {participants.map(participant => (
              <InviteStatus
                dinnerID={props.dinner.id ?? ''}
                participant={participant}
                key={participant.id}
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
                onPress={() => leaveDinner()}
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
