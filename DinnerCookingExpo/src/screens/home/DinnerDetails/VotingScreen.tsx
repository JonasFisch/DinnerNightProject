import React from 'react';
import { Text } from 'react-native';
import { Frame } from '../../../components/Frame';

type VotingScreenType = {
  isAdmin: boolean;
};

export const VotingScreen = (props: VotingScreenType) => {
  return (
    <Frame withSubPageHeader>
      <Text>Voting Screen</Text>
    </Frame>
  );
};
