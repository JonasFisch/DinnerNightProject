import React from 'react';
import { Text } from 'react-native';
import { UserFirebase } from '../interfaces/FirebaseSchema';

type InviteStatusProps = {
  participant: UserFirebase;
};
export const InviteStatus = (props: InviteStatusProps) => {
  return <Text>Invite Status</Text>;
};
