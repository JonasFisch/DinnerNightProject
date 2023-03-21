import { useFocusEffect } from '@react-navigation/native';
import { DocumentReference } from 'firebase/firestore';
import React, { useCallback, useContext, useState } from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import DatabaseContext from '../contexts/DatabaseContext';
import { InviteState, UserFirebase } from '../interfaces/FirebaseSchema';
import { colors } from '../styles/Color';
import { sizes } from '../styles/Sizes';
import { spacing } from '../styles/Spacing';
import { typography } from '../styles/Typography';
import { fetchUsers } from '../utils/userRequests';
import { Participants } from './Participants';

type DinnerListItemProps = {
  id: string;
  title: string;
  creationDate: Date;
  participants: DocumentReference[];
  onPress: (data: string) => void;
};

export const DinnerListItem = (props: DinnerListItemProps) => {
  const [participants, setParticipants] = useState<UserFirebase[]>([]);
  const db = useContext(DatabaseContext).database;

  const resolveParticipants = async () => {
    setParticipants(await fetchUsers(db, props.participants));
  };

  // fetch participants
  useFocusEffect(
    useCallback(() => {
      resolveParticipants();
    }, []),
  );

  return (
    <TouchableWithoutFeedback onPress={() => props.onPress(props.id)}>
      <View style={styles.dinnerListItemWrapper}>
        <View style={styles.textWrapper}>
          <Text style={[typography.body]}>{props.title}</Text>
          <Text style={typography.body2}>
            {props.creationDate.toLocaleDateString('de-DE', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </Text>
        </View>
        <Participants participants={participants} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  dinnerListItemWrapper: {
    borderColor: colors.textLight,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: sizes.borderRadius,
    padding: spacing.m,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textWrapper: {
    width: '60%',
  },
});
