import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { UserFirebase } from '../interfaces/FirebaseSchema';
import { UserImage } from './UserImage';
import CloseIcon from '../assets/icons/add.svg';
import { typography } from '../styles/Typography';

type InviteStatusProps = {
  dinnerID: string;
  participant: UserFirebase;
};

const inviteStateText = ['PENDING', 'ACCEPTED', 'REJECTED'];

export const InviteStatus = (props: InviteStatusProps) => {
  // TODO: use invite users function to invite people on a central point in the requests.ts
  const inviteState = props.participant.inviteStates[props.dinnerID];
  console.log(inviteState);
  if (inviteState === undefined) {
    console.error(
      'No invite state provided for dinner with ID of ' + props.dinnerID,
    );
    return null;
  }

  const revertInvite = () => {
    console.log('revert invite here!');
  };

  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <View style={styles.userImageContainer}>
          <UserImage
            name={props.participant.name}
            imageUrl={props.participant.imageUrl}
          />
          <Text
            style={[typography.body2, styles.userName]}
            ellipsizeMode="tail"
            numberOfLines={1}>
            {props.participant.name}
          </Text>
        </View>
        <Text style={styles.inviteStatusText}>
          {'invite status - '}
          <Text style={[styles.inviteStatus, inviteStyles[inviteState]]}>
            {inviteStateText[inviteState]}
          </Text>
        </Text>
      </View>
      <Pressable onPress={() => revertInvite()} style={styles.closeButton}>
        <CloseIcon />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  container: {
    flexDirection: 'row',
  },
  userImageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 50,
  },
  inviteStatusText: {
    marginTop: 10,
    marginLeft: 5,
  },
  inviteStatus: {
    fontWeight: 'bold',
  },
  userName: {},
  closeButton: {
    height: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
// TODO: use dynamic colors! (waiting for Kathis changes to color pallett!)
const inviteStyles = StyleSheet.create([
  {
    color: '#888',
  },
  {
    color: '#0f0',
  },
  {
    color: '#f00',
  },
]);
