import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  Timestamp,
} from 'firebase/firestore';
import React, { useContext, useState, useEffect } from 'react';
import { AppButton } from '../../components/Button';
import { Frame } from '../../components/Frame';
import { AppInput } from '../../components/Input';
import DatabaseContext from '../../contexts/DatabaseContext';
import { AppButtonType } from '../../interfaces/Button';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Platform, Text, View } from 'react-native';
import { DinnerDetailScreenParams } from './DinnerDetails/index';
import { createDinner } from '../../utils/dinnerRequests';
import { UserContext, useUserContext } from '../../contexts/UserContext';
import { useFocusEffect } from '@react-navigation/native';

export const CreateParty = ({ navigation }) => {
  const db = useContext(DatabaseContext).database;
  const userContext = useUserContext();

  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date(Date.now()));
  const [mode, setMode] = useState<any>('date');
  const [show, setShow] = useState<boolean>(true);

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => {
    if (selectedDate == undefined) return;
    const currentDate = selectedDate;
    if (Platform.OS === 'android') setShow(false);    
    setDate(currentDate);
  };

  const showMode = (currentMode: string) => {
    if (Platform.OS === 'android') {
      setShow(false);
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    console.log('show datepicker');
    showMode('date');
    setShow(true);
  };

  const showTimepicker = () => {
    console.log('show timepicker');
    showMode('time');
    setShow(true);
  };

  useEffect(() => {
    showMode('date');
  }, []);

  /*

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
      const clonedTime = new Date(time);
      clonedTime.setTime(newDate.getTime());
      setTime(clonedTime);
    } else console.error('Unexpected Error while setting time.');
  };

  const createParty = async () => {
    if (!userContext.currentUser?.uid) {
      console.error('user not authenticated');
      return;
    }

    const finalDate = date;
    finalDate.setTime(time.getTime());

    const participants: DocumentReference[] = [];

    const createdDinner = await createDinner(
      db,
      participants,
      doc(db, 'Users', userContext.currentUser?.uid),
      finalDate,
      name,
    );

    // remove create party from navigation stack and navigate to details screen
    navigation.popToTop();
    navigation.navigate('PartyDetails', {
      id: createdDinner.id,
    } as DinnerDetailScreenParams);
  };

  */

  return (
    /*<Frame>
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
        style={{ width: 200, height: 200, backgroundColor: 'green' }}
        value={date}
        minimumDate={new Date(Date.now())}
        onChange={setNewDate}
      />

      <AppButton
        title="create dinner"
        type={AppButtonType.primary}
        onPress={createParty}
      />
    </Frame>*/
    <View>
      <AppButton
        onPress={showDatepicker}
        title="Show date picker!"
        type={AppButtonType.primary}
      />
      <AppButton
        onPress={() => showTimepicker()}
        title="Show time picker!"
        type={AppButtonType.primary}
      />
      <Text>selected: {date.toLocaleString()}</Text>
      {show && (
        <RNDateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
};
