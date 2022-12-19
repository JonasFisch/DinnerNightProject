import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {UserDetails} from '../interfaces/UserDetails';
import {colors} from '../styles/Color';
import {sizes} from '../styles/Sizes';
import {typography} from '../styles/Typography';
import {Participants} from './Participants';

type DinnerListItemProps = {
  id: string;
  title: string;
  creationDate: Date;
  participants?: UserDetails[];
  onPress: (data: string) => void;
};

export const DinnerListItem = (props: DinnerListItemProps) => {
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
        <Participants participants={props.participants ?? []} />
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
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textWrapper: {
    width: '60%',
  },
});
