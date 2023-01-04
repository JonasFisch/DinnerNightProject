import React, { useContext, useRef } from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Frame} from '../../../components/Frame';
import {InviteStatus} from '../../../components/InviteStatus';
import InviteGrafic from '../../../assets/graphics/invited.svg';
import { AppButton } from '../../../components/Button';
import { AppButtonType } from '../../../interfaces/Button';
import { typography } from '../../../styles/Typography';
import { BottomSheet, BottomSheetRef } from 'react-native-sheet';
import { colors } from '../../../styles/Color';
import { useNavigation } from '@react-navigation/native';
import { leaveDinnerFB } from '../../../utils/dinners/updateDinner';
import DatabaseContext from '../../../contexts/DatabaseContext';
import UserContext from '../../../contexts/UserContext';
import { collection, collectionGroup, DocumentSnapshot, getDocs, query, where } from 'firebase/firestore/lite';
import { DinnerFirebase } from '../../../interfaces/FirebaseSchema';

type DinnerProps = {
  dinner: DinnerFirebase;
  isAdmin: boolean;
};

export const InviteScreen = (props: DinnerProps) => {

  const navigator = useNavigation();
  const bottomSheet = useRef<BottomSheetRef>(null);
  const db = useContext(DatabaseContext).database;
  const userDetails = useContext(UserContext).userDetails

  // get invite states
  const fetchInviteStates = async () => {
    const participantIDs = props.dinner.participants.map(participant => participant.id)

    console.log(participantIDs);
    
    // get states
    const participantsSnap = await getDocs(
      query(
        collection(db, "Users"),
        where("__name__", "in", participantIDs)
      ),
    )

    // TODO: transform participant data!
    console.log(participantsSnap.docs.map(participant => {
      return participant.data()
    }));


    // collection("Users")
  }
  fetchInviteStates()

  // leaves the dinner
  const leaveDinner = () => {
    // TODO: send request to Firebase
    bottomSheet.current?.hide();

    setTimeout(() => {
      navigator.goBack();
    }, 200);
  }

  return (
    <Frame>
      {props.isAdmin ? (
        <View>
          <Text>
            An invitation to your dinner was send to all participants. Once they
            accept the invite, you can start loading recipe proposals, that fit
            all participants eating preferences.
          </Text>
          {props.dinner.participants.map(participant => (
            <InviteStatus />
          ))}
        </View>
      ) : (
        <View>
          <Text style={typography.body}>
          You joined the Dinner! Once all other participants have accepted their invitation, the Owner of this Dinner will start loading recipe proposals!
          </Text>
          <InviteGrafic width={"100%"}></InviteGrafic>
          <AppButton title='LEAVE DINNER' type={AppButtonType.text} onPress={() => bottomSheet.current?.show()}></AppButton>
          <BottomSheet height={125} ref={bottomSheet} >
            <View style={style.bottomSheetView}>
              <AppButton title='LEAVE DINNER' type={AppButtonType.text} onPress={() => leaveDinner()}/>
            </View>
          </BottomSheet>
        </View>
      )}
    </Frame>
  );
};

const style = StyleSheet.create({
  bottomSheetView: {
    height: "100%", 
    display: 'flex', 
    justifyContent: "flex-start", 
    alignItems: "flex-start", 
    paddingTop: 20
  }
})
