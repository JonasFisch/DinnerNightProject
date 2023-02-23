import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  ViewPagerAndroidBase,
  StyleSheet,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { AppButton } from '../../../components/Button';
import { CarouselItem } from '../../../components/Carousel/CarouselItem';
import RecepieCarousel from '../../../components/Carousel/RecepieCarousel';
import { Frame } from '../../../components/Frame';
import { AppButtonType } from '../../../interfaces/Button';
import RefreshIcon from '../../../assets/icons/refresh.svg';
import { colors } from '../../../styles/Color';
import { spacing } from '../../../styles/Spacing';
import { ParticipantVotingRow } from '../../../components/ParticipantVotingRow';
import { typography } from '../../../styles/Typography';
import { AvatarList } from '../../../components/AvatarList';
import { DinnerFirebase, UserFirebase } from '../../../interfaces/FirebaseSchema';

type VotingScreenType = {
  isAdmin: boolean;
  participants: UserFirebase[]
  dinner?: DinnerFirebase ,
};

export const VotingScreen = (props: VotingScreenType) => {
  const navigator = useNavigation();

  return (
    <Frame style={{paddingHorizontal: 0}} withSubPageHeader>
      <ScrollView>
        <View style={styles.paddingHorizontal}>
          <ParticipantVotingRow />
          <AvatarList participants={props.participants} />
          <View style={styles.spaceBetween}>
            <Text style={typography.subtitle2}>
              Recipe proposals
            </Text>
            <RefreshIcon style={styles.refreshIcon}/>
          </View>
        </View>
        <View style={{backgroundColor: colors.white}}>
          <RecepieCarousel />
        </View>
        <View style={styles.paddingHorizontal}>
          <Text>Vote for your preferred recipe!</Text>
        </View>
      </ScrollView>
      {/* TODO: nochmal detailierter entscheiden je nach admin view */}
      <View style={[styles.paddingHorizontal, {flexDirection: "row", flex: 1, justifyContent: 'space-between'}]}>
        <AppButton
          style={{marginBottom: spacing.s, flex: 1, marginRight: spacing.s}}
          title="CHANGE"
          disabled={false}
          type={AppButtonType.secondary}
        />
        <AppButton
          style={{flex: 1}}
          title="SAVE"
          disabled={false}
          type={AppButtonType.primary}
        />
      </View>
    </Frame>
  );
};

const styles = StyleSheet.create({
  refreshIcon: {
    height: 24,
    width: 24,
    fill: colors.text,
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  paddingHorizontal: {
    paddingHorizontal: spacing.m,
  }
})