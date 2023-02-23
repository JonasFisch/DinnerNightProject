import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
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
import { Row } from '../../../components/Row';
import { typography } from '../../../styles/Typography';
import { sizes } from '../../../styles/Sizes';
import { AvatarList } from '../../../components/AvatarList';
import { DinnerFirebase, UserFirebase } from '../../../interfaces/FirebaseSchema';

type WinnerScreenType = {
  isAdmin: boolean;
  participants: UserFirebase[]
  dinner?: DinnerFirebase ,
};

export const WinnerScreen = (props: WinnerScreenType) => {
  const navigator = useNavigation();

  return (
    <Frame withSubPageHeader>
      <ScrollView style={{marginBottom: spacing.l}}>
        <Row spaceBetween>
          <Text style={typography.subtitle2}>Participants</Text>
          <Row style={{alignItems: "flex-end"}}>
            <Text style={typography.overline}>0 / 4</Text>
            <Text style={typography.body2}>{" "}voted</Text>
          </Row>
        </Row>
        <AvatarList participants={props.participants} />
        <Row spaceBetween style={{marginBottom: spacing.m}}>
          <Text style={typography.subtitle2}>
            Winner Recipe
          </Text>
        </Row>
        <View style={{ width: '100%', height: 250 }}>
            <CarouselItem name="Vegetarian Lasagne" selected={false} />    
        </View>
        <View style={{marginTop: spacing.m}}>
          <Text style={typography.overline}>
            Congratulation! 
          </Text>
          <Text style={typography.body}>
            Your dinner participants agreed on a winner recipe. Let’s cook it!
          </Text>
        </View>
      </ScrollView>
      <View style={{flexDirection: "row", flex: 1, justifyContent: "space-around"}}>
        <AppButton
          style={{marginBottom: spacing.s, flex: 1, marginRight: spacing.s}}
          title="FINISH"
          type={AppButtonType.secondary}
          // TODO: finish Dinner
          onPress={() => navigator.navigate('Recipe')}
        />
        <AppButton
          style={{flex: 1}}
          title="COOK"
          type={AppButtonType.primary}
          onPress={() => navigator.navigate('Recipe')}
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

})