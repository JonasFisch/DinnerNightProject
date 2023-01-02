import React from 'react';
import {Text, View} from 'react-native';
import {Frame} from '../../../components/Frame';
import {InviteStatus} from '../../../components/InviteStatus';
import {Dinner} from '../../../interfaces/Dinner';

type DinnerProps = {
  dinner: Dinner;
  isAdmin: boolean;
};

export const InviteScreen = (props: DinnerProps) => {
  return (
    <Frame>
      <Text>Participants</Text>
      {props.isAdmin ? (
        <View>
          <Text>
            An invitation to your dinner was send to all participants. Once they
            accept the invite, you can start loading recipe proposals, that fit
            all participants eating preferences.
          </Text>
          {props.dinner.participants.map(participant => (
            <InviteStatus />
          ))}
        </View>
      ) : (
        <View>
          <Text>Hier kommt der User View hin!</Text>
        </View>
      )}
    </Frame>
  );
  // return <Text>Invite Screen {props.dinner.name}</Text>;
};
