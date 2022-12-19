import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {UserDetails} from '../interfaces/UserDetails';
import {typography} from '../styles/Typography';
import {UserImage} from './UserImage';

type ParticipantsProps = {
  participants: UserDetails[];
};

export const Participants = (props: ParticipantsProps) => {
  let notShownParticipants: number = 0;
  if (props.participants.length > 3) {
    notShownParticipants = props.participants.length - 3;
  }

  return (
    <View style={styles.participantsWrapper}>
      <View style={styles.participants}>
        {props.participants.slice(0, 3).map((participant, index) => {
          return (
            <View
              key={`participant-${index}`}
              style={[
                styles.userImage,
                {right: 5 + index * 25, zIndex: index * 2},
              ]}>
              <UserImage
                name={participant.name}
                imageUrl={participant.imageUrl}
              />
            </View>
          );
        })}
      </View>
      <View>
        <Text style={[typography.body2, styles.moreText]}>
          {notShownParticipants !== 0 ? '+' + notShownParticipants : '  '}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  participantsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 0,
  },
  participants: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  userImage: {
    position: 'absolute',
    bottom: '-50%',
    transform: [
      {
        translateY: 3,
      },
    ],
  },
  moreText: {
    textAlign: 'center',
    width: 15,
  },
});
