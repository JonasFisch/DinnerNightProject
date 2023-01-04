import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  Timestamp,
} from 'firebase/firestore/lite';
import React, {useContext, useState} from 'react';
import {AppButton} from '../../components/Button';
import {Frame} from '../../components/Frame';
import {AppInput} from '../../components/Input';
import DatabaseContext from '../../contexts/DatabaseContext';
import UserContext from '../../contexts/UserContext';
import {AppButtonType} from '../../interfaces/Button';
import {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {Text} from 'react-native';
import {DinnerDetailScreenParams} from './DinnerDetails/index';
import { createDinner } from '../../utils/dinnerRequests';

export const CreateParty = ({navigation}) => {
  const db = useContext(DatabaseContext).database;
  const userContext = useContext(UserContext);

  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date(Date.now()));

  const setNewDate = (
    _event: DateTimePickerEvent,
    newDate: Date | undefined,
  ) => {
    // only extract date from given date
    if (newDate) {
      const clonedDate = new Date(date);
      clonedDate.setDate(newDate.getDate());
      setDate(clonedDate);
    } else console.error('Unexpected Error while setting date.');
  };

  const setNewTime = (
    _event: DateTimePickerEvent,
    newDate: Date | undefined,
  ) => {
    // only extract time from given date
    if (newDate) {
      const clonedDate = new Date(date);
      clonedDate.setTime(newDate.getTime());
      setDate(clonedDate);
    } else console.error('Unexpected Error while setting time.');
  };

  const createParty = async () => {
    if (!userContext.userData?.uid) {
      console.error('user not authenticated');
      return;
    }

    const participants: DocumentReference[] = [];
    // const userSelfRef = doc(db, 'Users', userContext.userData.uid);

    // const docData: Dinner = {
    //   date: Timestamp.fromDate(date),
    //   name,
    //   participants: [
    //     userSelfRef, // self
    //     ...participants,
    //   ],
    //   admin: userSelfRef,
    //   state: DinnerState.INVITE,
    // };

    // const newDoc = await addDoc(
    //   collection(db, 'Dinners'),
    //   docData,
    // );

    const createdDinner = await createDinner(db, participants, doc(db, 'Users', userContext.userData.uid), date, name)

    // remove create party from navigation stack and navigate to details screen
    navigation.popToTop();
    navigation.navigate('PartyDetails', {
      id: createdDinner.id,
    } as DinnerDetailScreenParams);
  };

  return (
    <Frame>
      <AppInput
        label="Dinner name"
        value={name}
        onChangeText={setName}
        textContentType="none"
        keyboardType="default"
      />

      <Text>{date.toLocaleDateString()}</Text>
      <Text>{date.toLocaleTimeString()}</Text>

      <RNDateTimePicker
        value={date}
        minimumDate={new Date(Date.now())}
        onChange={setNewDate}
      />

      <RNDateTimePicker value={date} mode="time" onChange={setNewTime} />

      <AppButton
        title="create dinner"
        type={AppButtonType.primary}
        onPress={createParty}
      />
    </Frame>
  );
};
