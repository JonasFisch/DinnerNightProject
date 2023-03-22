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
import { DinnerFirebase, Recipe, UserFirebase } from '../../../interfaces/FirebaseSchema';
import { fetchRecipes, setVote, setVotingTerminated } from '../../../utils/dinnerRequests';
import { useContext } from 'react';
import DatabaseContext from '../../../contexts/DatabaseContext';
import { useUserContext } from '../../../contexts/UserContext';

type VotingScreenType = {
  isAdmin: boolean;
  participants: UserFirebase[]
  dinner?: DinnerFirebase ,
};

export const VotingScreen = (props: VotingScreenType) => {
  const navigator = useNavigation();
  const db = useContext(DatabaseContext).database;
  const user = useUserContext()
  const [selected, setSelected] = useState(props.dinner?.votes[user.currentUser?.uid ?? 0]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const getRecipes = async () => {
    const recipes = await fetchRecipes(db, props.dinner?.recipes.map(recipe => recipe.id));
    setRecipes(recipes);
  };
  useFocusEffect(
    useCallback(() => {
      getRecipes()
    }, []),
  );

  const savedVote = props.dinner?.votes[user.currentUser?.uid ?? 0]

  const saveVote = () => {
    setVote(db, props.dinner?.id, selected, user.currentUser?.uid)
  }

  const terminateVoting = () => {
    setVotingTerminated(db, props.dinner?.id)
  }

  const votes = Object.keys(props.dinner?.votes ?? {}).length;

  return (
    <Frame style={{paddingHorizontal: 0}} withSubPageHeader>
      <ScrollView>
        <View style={styles.paddingHorizontal}>
          <ParticipantVotingRow total={props.dinner?.participants.length ?? 0} voted={votes} />
          <AvatarList participants={props.participants} />
          <View style={styles.spaceBetween}>
            <Text style={typography.subtitle2}>
              Recipe proposals
            </Text>
            <RefreshIcon style={styles.refreshIcon} />
          </View>
        </View>
        <View style={{backgroundColor: colors.white}}>
          <RecepieCarousel recipes={recipes} selected={selected} setSelected={(selected) => setSelected(selected)} />
        </View>
        <View style={styles.paddingHorizontal}>
          <Text>Vote for your preferred recipe!</Text>
        </View>
      </ScrollView>
      <View style={[styles.paddingHorizontal, {flexDirection: "column", flex: 1, justifyContent: 'space-between', marginBottom: 50}]}>
        <AppButton
          title="SAVE"
          disabled={selected == savedVote}
          type={AppButtonType.primary}
          onPress={() => {
            saveVote()
          }}
        />
        {
          props.isAdmin && <AppButton
            style={{marginTop: spacing.m}}
            title="TERMINATE VOTING PHASE"
            type={AppButtonType.primary}
            onPress={() => {
              terminateVoting()
            }}
          />
        }
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