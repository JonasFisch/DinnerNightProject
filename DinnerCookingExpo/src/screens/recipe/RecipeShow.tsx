import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { AppButton } from '../../components/Button';
import { Frame } from '../../components/Frame';
import { Ingredients } from '../../components/Ingredients';
import { Instruction } from '../../components/Instruction';
import { Row } from '../../components/Row';
import DatabaseContext from '../../contexts/DatabaseContext';
import { AppButtonType } from '../../interfaces/Button';
import { Recipe } from '../../interfaces/FirebaseSchema';
import { spacing } from '../../styles/Spacing';
import { typography } from '../../styles/Typography';
import { fetchRecipe, finishDinner } from '../../utils/dinnerRequests';
import ParamList from '../../utils/ParameterDefinitions';

export type DinnerDetailScreenParams = {
  id: string;
};

export const RecipeShow = (props: DinnerDetailScreenParams) => {
  const [recipe, setRecipe] = useState<Recipe>();
  const route = useRoute<RouteProp<ParamList, 'RecipeDetailScreen'>>();
  const recipeID: string = route.params.id;
  const dinnerID: string = route.params.dinnerID;
  const canFinishDinner: boolean = route.params.canFinishDinner;
  const navigator = useNavigation();
  // TODO: add recipes can be finished in route

  const db = useContext(DatabaseContext).database;

  const resolveRecipe = async () => {
    try {
      const fetchedRecipe = await fetchRecipe(db, recipeID);

      setRecipe(fetchedRecipe);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    navigator.setOptions({
      title: recipe?.title,
    });

    const resolveRecipe = async () => {
      try {
        const fetchedRecipe = await fetchRecipe(db, recipeID);

        setRecipe(fetchedRecipe);
      } catch (error) {
        console.log(error);
      }
    };

    resolveRecipe();
  }, []);

  return (
    <ScrollView>
      <Frame withSubPageHeader>
        <Image
          style={{
            width: '100%',
            height: 200,
            borderRadius: 8,
            marginBottom: spacing.xs,
          }}
          source={{
            uri: recipe?.image,
          }}
        />

        <Row spaceBetween style={{ marginBottom: spacing.xl }}>
          <Text style={typography.body}>
            Cooking time: {recipe?.readyInMinutes} min
          </Text>
        </Row>

        <View style={{ marginBottom: spacing.xl }}>
          <Text style={[typography.subtitle2, { marginBottom: spacing.s }]}>
            Ingredients
          </Text>
          <Ingredients
            ingredients={recipe?.extendedIngredients ?? []}
            servings={recipe?.servings ?? 0}
          />
        </View>

        <View>
          <Text style={typography.subtitle2}>Instructions</Text>
          {recipe?.analyzedInstructions[0].steps.map((step, index) => {
            return (
              <View key={'step' + step.number}>
                <Text
                  style={[
                    typography.overline,
                    { marginTop: spacing.xs, marginBottom: spacing.xxs },
                  ]}>
                  Step {step.number}
                </Text>
                <Instruction>{step.step}</Instruction>
              </View>
            );
          })}
        </View>
        {canFinishDinner && (
          <AppButton
            // TODO: finish dinner action
            onPress={() => {
              finishDinner(db, dinnerID);
              navigator.navigate('Dinners');
            }}
            title={'FINISH DINNER'}
            type={AppButtonType.primary}
            style={{ marginTop: spacing.l }}
          />
        )}
      </Frame>
    </ScrollView>
  );
};
