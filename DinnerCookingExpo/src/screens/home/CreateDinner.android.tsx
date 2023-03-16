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
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { DinnerDetailScreenParams } from './DinnerDetails/index';
import { createDinner } from '../../utils/dinnerRequests';
import { UserContext, useUserContext } from '../../contexts/UserContext';
import { useFocusEffect } from '@react-navigation/native';
import { spacing } from '../../styles/Spacing';
import { typography } from '../../styles/Typography';

export const CreateDinner = ({ navigation }) => {
  const db = useContext(DatabaseContext).database;
  const userContext = useUserContext();

  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date(Date.now()));
  const [mode, setMode] = useState<any>('date');
  const [show, setShow] = useState<boolean>(false);
  const [isAndroid, setIsAndroid] = useState<boolean>(false);

  const triggerDatePicker = (mode: string) => {
    setMode(mode);
    setShow(true);
  };

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => {
    if (selectedDate == undefined) return;
    if (mode == 'date') {
      const newDate = selectedDate.getDate();
      const newDateTime = new Date(date);
      newDateTime.setDate(newDate);
      setDate(newDateTime);
    } else if (mode == 'time') {
      const newTime = selectedDate.getTime();
      const newDateTime = new Date(date);
      newDateTime.setTime(newTime);
      setDate(newDateTime);
    }
    setShow(false);
  };

  return (
    <Frame withSubPageHeader>
      <AppInput
        style={styles.nameInput}
        label="Dinner name"
        value={name}
        onChangeText={setName}></AppInput>
      <View style={styles.dateWrapper}>
        <Text style={[typography.subtitle2, styles.dateLabel]}>Date:</Text>
        <Pressable onPress={() => triggerDatePicker('date')}>
          <Text style={typography.body}>{date.toLocaleDateString()}</Text>
        </Pressable>
      </View>
      <View style={styles.dateWrapper}>
        <Text style={[typography.subtitle2, styles.dateLabel]}>Time:</Text>
        <Pressable onPress={() => triggerDatePicker('time')}>
          <Text style={typography.body}>{date.toLocaleTimeString()}</Text>
        </Pressable>
      </View>
      {show && (
        <RNDateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={(e, date) => {
            setShow(false);
            onChange(e, date);
          }}
        />
      )}
    </Frame>
  );
};

const styles = StyleSheet.create({
  nameInput: {
    marginBottom: spacing.xl,
  },
  dateWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: spacing.xl,
  },
  dateLabel: {
    marginRight: spacing.l,
  },
});
