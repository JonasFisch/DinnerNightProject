import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { UserFirebase } from '../interfaces/FirebaseSchema';
import { UserImage } from './UserImage';

type InviteStatusProps = {
  dinnerID: string,
  participant: UserFirebase,
}

const inviteStateText = [
  "PENDING",
  "ACCEPTED",
  "REJECTED",
]

export const InviteStatus = (props: InviteStatusProps) => {  
  // TODO: use invite users function to invite people on a central point in the requests.ts
  const inviteState = props.participant.inviteStates[props.dinnerID]
  console.log(inviteState);
  if (inviteState === undefined) {
    console.error("No invite state provided for dinner with ID of " + props.dinnerID);
    return null;
  }


  return <View>
    <View>
      <UserImage name={props.participant.name} imageUrl={props.participant.imageUrl} />
      <Text>{props.participant.name}</Text>
    </View>
    <Text>{"invite status - "} 
      <Text style={inviteStyles[inviteState]}>
        {inviteStateText[inviteState]}
      </Text>
    </Text>
  </View>
};

// TODO: use dynamic colors! (waiting for Kathis changes to color pallett!)
const inviteStyles = StyleSheet.create(
  [
    {
      color: "#888"
    },
    {
      color: "#f00"
    },
    {
      color: "#0f0"
    }
  ]
) 

