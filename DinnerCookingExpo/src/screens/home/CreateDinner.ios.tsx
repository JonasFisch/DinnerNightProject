import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { doc } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '../../components/Button';
import { ChipList } from '../../components/ChipList';
import { Frame } from '../../components/Frame';
import { AppInput } from '../../components/Input';
import { SelectableListEntry } from '../../components/SelectableList';
import DatabaseContext from '../../contexts/DatabaseContext';
import { useUserContext } from '../../contexts/UserContext';
import { AppButtonType } from '../../interfaces/Button';
import { spacing } from '../../styles/Spacing';
import { typography } from '../../styles/Typography';
import { createDinner } from '../../utils/dinnerRequests';
import CheckIcon from '../../assets/icons/check.svg';

export const CreateDinner = () => {
  const db = useContext(DatabaseContext).database;
  const userContext = useUserContext();

  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date(Date.now()));
  const [mode, setMode] = useState<any>('date');
  const [show, setShow] = useState<boolean>(false);
  const [participants, setParticipants] = useState<SelectableListEntry[]>([]);
  const navigator = useNavigation();

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

  const saveDinner = () => {
    if (!userContext.currentUser) throw new Error('User not authenticated');

    const userRef = doc(db, 'Users', userContext.currentUser?.uid);
    const participantsRefs = participants.map(user =>
      doc(db, 'Users', user.id),
    );

    createDinner(db, participantsRefs, userRef, date, name)
      .then(() => {
        navigator.goBack();
      })
      .catch(error => {
        console.error('error during creating dinner: ', error);
      });
  };

  return (
    <Frame withSubPageHeader>
      <AppInput
        style={styles.nameInput}
        label="Dinner name"
        value={name}
        onChangeText={setName}></AppInput>
      <View style={[styles.dateWrapper, {flexDirection: 'row', alignItems: "center"}]}>
        <Text style={[typography.subtitle2, styles.dateLabel]}>Date:</Text>
        <RNDateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          onChange={(e, date) => {
            if (date) setDate(date)
          }}
        />
      </View>
      <View style={[styles.dateWrapper, {flexDirection: 'row', alignItems: "center"}]}>
        <Text style={[typography.subtitle2, styles.dateLabel]}>Time:</Text>
        <RNDateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'time'}
          is24Hour={true}
          onChange={(e, date) => {
            if (date) setDate(date)
          }}
        />
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
      <AppButton
        type={AppButtonType.primary}
        title="save selection"
        iconOnly
        onPress={saveDinner}
        widthFitContent
        logoSVG={CheckIcon}
        style={styles.button}
        disabled={name ? false : true}
      />
    </Frame>
  );
};

const styles = StyleSheet.create({
  nameInput: {
    marginBottom: spacing.xl,
    marginTop: spacing.xs,
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
  button: {
    position: 'absolute',
    bottom: spacing.m,
    right: spacing.m,
  },
});
