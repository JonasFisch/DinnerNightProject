import { StyleSheet, View } from 'react-native';
import { DinnerListItem } from './DinnerListItem';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { DinnerDetailScreenParams } from '../screens/home/DinnerDetails/DinnerDetailScreen';
import { DinnerFirebase } from '../interfaces/FirebaseSchema';
import { spacing } from '../styles/Spacing';

type DinnerListProps = {
  dinners: DinnerFirebase[];
};
export const DinnerList = (props: DinnerListProps) => {

  const navigator = useNavigation();

  // navigate to dinner details screen
  const openDinnerDetails = (dinnerID: string) => {
    navigator.navigate('PartyDetails', {
      id: dinnerID,
    } as DinnerDetailScreenParams);
  };

  return (
    <View>
      {props.dinners.map(dinner => (
        <View key={dinner.id} style={styles.dinnerListItem}>
          <DinnerListItem
            title={dinner.name}
            creationDate={dinner.date.toDate()}
            id={dinner.id ?? ''}
            key={dinner.id}
            participants={dinner.participants}
            onPress={openDinnerDetails}
          />
        </View>
      ))}
      <View style={styles.spacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  dinnerListItem: {
    marginBottom: spacing.m,
  },
  spacer: {
    marginBottom: 80,
  },
});
