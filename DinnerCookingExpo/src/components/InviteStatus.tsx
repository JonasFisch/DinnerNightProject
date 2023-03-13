import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { InviteState, UserFirebase } from '../interfaces/FirebaseSchema';
import { UserImage } from './UserImage';
import CloseIcon from '../assets/icons/close.svg';
import { typography } from '../styles/Typography';
import { colors } from '../styles/Color';

type InviteStatusProps = {
  dinnerID: string;
  participant?: UserFirebase;
  inviteState: InviteState;
  onRevertInvite: () => {};
};

const inviteStateText = ['PENDING', 'ACCEPTED', 'REJECTED'];

export const InviteStatus = (props: InviteStatusProps) => {

  if (!props.participant) return null

  return (
    <View style={styles.card}>
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
      <View style={styles.inviteStatusText}>
        <Text>
          {'invite status - '}
          <Text style={[styles.inviteStatus, inviteStyles[props.inviteState]]}>
            {inviteStateText[props.inviteState]}
          </Text>
        </Text>
      </View>
      <Pressable onPress={() => props.onRevertInvite()} style={styles.closeButton}>
        <CloseIcon fill={colors.text} />
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
  userImageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 50,
  },
  inviteStatusText: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
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
    color: colors.disabled,
  },
  {
    color: colors.success,
  },
  {
    color: colors.error,
  },
]);
