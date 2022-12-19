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
import {Dinner} from '../../interfaces/Dinner';

// import DateTimePicker, {
//   DateTimePickerAndroid,
// } from '@react-native-community/datetimepicker';
import moment from 'moment';

export const CreateParty = () => {
  const dbContext = useContext(DatabaseContext);
  const userContext = useContext(UserContext);

  const [name, setName] = useState<string>('');
  const [date, setDate] = useState(new Date(1598051730000));
  // const [date, setDate] = useState<Date>(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  // const test = async () => {
  //   console.log('test');
  //   try {
  //     const {action, year, month, day} = await DateTimePickerAndroid.open({
  //       value: new Date(),
  //       onChange: onChange,
  //     });
  //   } catch ({code, message}) {
  //     console.warn('Cannot open date picker', message);
  //   }
  // };

  const createParty = async () => {
    if (!userContext.userData?.uid) {
      console.error('user not authenticated');
      return;
    }

    // TODO: fill participants
    const participants: DocumentReference[] = [];

    const docData: Dinner = {
      date: Timestamp.now(),
      name: 'Aus der App erstellt',
      participants: [
        doc(dbContext.database, 'Users', userContext.userData.uid), // self
        ...participants,
      ],
    };

    await addDoc(collection(dbContext.database, 'Dinners'), docData);
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

      <AppButton
        title="create dinner"
        type={AppButtonType.primary}
        onPress={createParty}
      />
    </Frame>
  );
};
