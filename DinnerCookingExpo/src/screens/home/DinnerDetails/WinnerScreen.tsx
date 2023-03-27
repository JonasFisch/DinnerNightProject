import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Text, View, ScrollView, StyleSheet, Dimensions } from 'react-native';
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
import {
  DinnerFirebase,
  DinnerState,
  Recipe,
  UserFirebase,
} from '../../../interfaces/FirebaseSchema';
import { ParticipantVotingRow } from '../../../components/ParticipantVotingRow';
import { fetchRecipe, finishDinner } from '../../../utils/dinnerRequests';
import DatabaseContext from '../../../contexts/DatabaseContext';

type WinnerScreenType = {
  isAdmin: boolean;
  participants: UserFirebase[];
  dinner?: DinnerFirebase;
};

export const WinnerScreen = (props: WinnerScreenType) => {
  const navigator = useNavigation();
  const db = useContext(DatabaseContext).database;

  const [recipe, setRecipe] = useState<Recipe>();
  const [voted, setVoted] = useState(0);
  const votes = Object.keys(props.dinner?.votes ?? {}).length;

  useEffect(() => {
    const votingArray = Object.keys(props.dinner?.votes ?? {}).reduce(
      (acc, key) => {
        acc.push(props.dinner?.votes[key]);
        return acc;
      },
      [],
    );

    // get #votings for each recipe
    const elementCounts = {};
    votingArray.forEach(element => {
      elementCounts[element] = (elementCounts[element] || 0) + 1;
    });

    // determine winner
    let highestCount = 0;
    let winner = null;
    for (const key of Object.keys(elementCounts)) {
      if (highestCount < elementCounts[key]) {
        winner = key;
        highestCount = elementCounts[key];
      }
    }

    // if no recipe was voted then just take the first recipe
    if (!winner) {
      winner = props.dinner?.recipes[0].id;
    }

    setVoted(highestCount);

    fetchRecipe(db, winner).then(recipe => {
      setRecipe(recipe);
    });
  }, []);

  const PAGE_HEIGHT = Dimensions.get('screen').height;

  return (
    <Frame withSubPageHeader>
      <ScrollView>
        <ParticipantVotingRow
          total={props.dinner?.participants.length ?? 0}
          voted={votes}
        />
        <AvatarList
          participants={props.participants}
          votes={props.dinner?.votes ?? {}}
          style={{ marginBottom: spacing.m }}
        />
        <Row spaceBetween style={{ marginBottom: spacing.m }}>
          <Text style={typography.subtitle2}>Winner Recipe</Text>
        </Row>
        <View style={{ height: PAGE_HEIGHT * 0.35 }}>
          <CarouselItem
            name={recipe?.title ?? ''}
            imageURL={recipe?.image}
            selected={false}
            hideSelected
            voting={{
              total: props.dinner?.participants.length ?? 0,
              voted: voted,
            }}
            duration={(recipe?.readyInMinutes ?? 0) / 60}
          />
        </View>
        <Text
          style={[
            typography.overline,
            { marginBottom: spacing.xs, marginTop: spacing.l },
          ]}>
          Congratulation!
        </Text>
        <Text style={typography.body}>
          Your dinner participants agreed on a winner recipe. Let’s cook it!
        </Text>
      </ScrollView>
      <View style={[styles.horizontalButtonContainer]}>
        {
          props.dinner?.state != DinnerState.FINISHED && <AppButton
            style={[styles.button, { marginRight: spacing.m }]}
            title="FINISH"
            type={AppButtonType.secondary}
            // TODO: finish Dinner
            onPress={() => {
              finishDinner(db, props.dinner?.id);
              navigator.navigate('Dinners');
            }}
          />
        }
        <AppButton
          style={styles.button}
          title="COOK"
          type={AppButtonType.primary}
          onPress={() =>
            navigator.navigate('Recipe', {
              id: recipe?.id,
              canFinishDinner: props.dinner?.state != DinnerState.FINISHED,
              dinnerID: props.dinner?.id,
            })
          }
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
    justifyContent: 'space-between',
  },
  horizontalButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.m,
  },
  button: {
    flex: 1,
  },
});
