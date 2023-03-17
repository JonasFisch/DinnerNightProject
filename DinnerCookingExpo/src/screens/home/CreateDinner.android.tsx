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
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { DinnerDetailScreenParams } from './DinnerDetails/index';
import { createDinner } from '../../utils/dinnerRequests';
import { UserContext, useUserContext } from '../../contexts/UserContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { spacing } from '../../styles/Spacing';
import { typography } from '../../styles/Typography';
import { Chip } from '../../components/Chip';
import { ChipList } from '../../components/ChipList';
import { SelectableListEntry } from '../../components/SelectableList';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const CreateDinner = ({ navigation }) => {
  const db = useContext(DatabaseContext).database;
  const userContext = useUserContext();
  const navigator = useNavigation();

  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date(Date.now()));
  const [mode, setMode] = useState<any>('date');
  const [show, setShow] = useState<boolean>(false);
  const [participants, setParticipants] = useState<SelectableListEntry[]>([]);

  const triggerDatePicker = (mode: string) => {
    setMode(mode);
    setShow(true);
  };

  const handleDateChange = (selectedDate: Date | undefined) => {
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
  };

  const formatDate = (d: Date) => {
    const year = d.getFullYear();
    const date = d.getDate();
    const monthName = months[d.getMonth()];
    const dayName = days[d.getDay()];
    return `${dayName}, ${date} ${monthName} ${year}`;
  };

  const handleSelectionChange = (participant: SelectableListEntry) => {
    const isValueAlreadySelected = participants.find(
      element => element.id === participant.id,
    );
    let newSelectedValues = [...participants];
    if (isValueAlreadySelected) {
      newSelectedValues = newSelectedValues.filter(
        element => element.id !== participant.id,
      );
    } else {
      newSelectedValues.push(participant);
    }
    setParticipants(newSelectedValues);
  };

  const triggerSearchPage = () => {
    navigator.navigate('AddDinnerParticipants', {
      participants: participants,
      onSave: onAddParticipants,
    });
  };

  const onAddParticipants = (participants: SelectableListEntry[]) => {
    setParticipants(participants);
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
          <Text style={typography.body}>{formatDate(date)}</Text>
        </Pressable>
      </View>
      <View style={styles.dateWrapper}>
        <Text style={[typography.subtitle2, styles.dateLabel]}>Time:</Text>
        <Pressable onPress={() => triggerDatePicker('time')}>
          <Text style={typography.body}>
            {date.toLocaleTimeString().substring(0, 5)} Uhr
          </Text>
        </Pressable>
      </View>
      <Text style={[typography.subtitle2]}>Participants</Text>
      <Text style={[typography.body, styles.description]}>
        Invite your friends to the dinner
      </Text>
      <ChipList
        items={participants}
        onPress={handleSelectionChange}
        onAdd={triggerSearchPage}
        withAvatar
        withAddButton></ChipList>
      {show && (
        <RNDateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={(e, date) => {
            setShow(false);
            handleDateChange(date);
          }}
        />
      )}
    </Frame>
  );
};

const styles = StyleSheet.create({
  nameInput: {
    marginBottom: spacing.xl,
    marginTop: spacing.s,
  },
  dateWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: spacing.xl,
  },
  dateLabel: {
    marginRight: spacing.l,
  },
  description: {
    marginTop: spacing.xs,
  },
  selectedValuesList: {
    marginVertical: spacing.xs,
    maxHeight: 50,
  },
  listContentContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
});
