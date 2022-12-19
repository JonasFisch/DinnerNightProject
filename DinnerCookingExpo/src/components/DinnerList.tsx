import {StyleSheet, View} from 'react-native';
import {DinnerListItem} from './DinnerListItem';
import React from 'react';
import {Dinner} from '../interfaces/Dinner';
import {ParticipantMap, UserDetails} from '../interfaces/UserDetails';
import {Participants} from './Participants';

type DinnerListProps = {
  dinners: Array<Dinner>;
  participantsMap: ParticipantMap;
};
export const DinnerList = (props: DinnerListProps) => {
  const mappedDinners = props.dinners.map(dinner => {
    const mappedDinner = dinner;
    const participants = dinner.participants.map(participant =>
      props.participantsMap.get(participant.id),
    );
    mappedDinner.participantsResolved = participants.filter(
      participant => participant !== null && participant !== undefined,
    ) as UserDetails[];
    return mappedDinner;
  });

  return (
    <View>
      {mappedDinners.map(dinner => (
        <View key={dinner.id} style={styles.dinnerListItem}>
          <DinnerListItem
            title={dinner.name}
            creationDate={dinner.date.toDate()}
            id={dinner.id}
            key={1}
            participants={dinner.participantsResolved}
          />
        </View>
      ))}
      <View style={styles.spacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  dinnerListItem: {
    marginBottom: 12,
  },
  spacer: {
    marginBottom: 80,
  },
});
