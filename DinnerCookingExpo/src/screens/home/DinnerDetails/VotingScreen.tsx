import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  ViewPagerAndroidBase,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { AppButton } from '../../../components/Button';
import { CarouselItem } from '../../../components/Carousel/CarouselItem';
import RecepieCarousel from '../../../components/Carousel/RecepieCarousel';
import { Frame } from '../../../components/Frame';
import { AppButtonType } from '../../../interfaces/Button';

type VotingScreenType = {
  isAdmin: boolean;
};

export const VotingScreen = (props: VotingScreenType) => {
  const navigator = useNavigation();
  const winnerRecpie = true;

  return (
    <ScrollView>
      {/* TODO: Participants */}
      <Frame>
        <Text>Participants (WIP)</Text>
      </Frame>
      {winnerRecpie ? (
        <View style={{ width: '100%', height: 250 }}>
          <CarouselItem
            name="Vegetarian Lasagne"
            selected={false}></CarouselItem>
        </View>
      ) : (
        <RecepieCarousel />
      )}
      <Frame>
        <Text>Vote for your preferred recipe!</Text>
        {winnerRecpie ? (
          <AppButton
            title="COOK WINNER RECIPE"
            type={AppButtonType.primary}
            onPress={() => navigator.navigate('Recipe')}
          />
        ) : (
          <AppButton
            title="SAVE VOTE"
            disabled={false}
            type={AppButtonType.primary}
          />
        )}
      </Frame>
    </ScrollView>
  );
};
