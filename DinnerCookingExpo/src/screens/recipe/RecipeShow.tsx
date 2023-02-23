import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useContext, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { AppButton } from '../../components/Button';
import { Frame } from '../../components/Frame';
import { Instruction } from '../../components/Instruction';
import DatabaseContext from '../../contexts/DatabaseContext';
import { AppButtonType } from '../../interfaces/Button';
import { Recipe } from '../../interfaces/FirebaseSchema';
import { spacing } from '../../styles/Spacing';
import { typography } from '../../styles/Typography';
import { fetchRecipe } from '../../utils/dinnerRequests';

export const RecipeShow = () => {
  const [recipe, setRecipe] = useState<Recipe>();

  const db = useContext(DatabaseContext).database;

  const resolveRecipe = async () => {
    try {
      const fetchedRecipe = await fetchRecipe(
        db,
        "ASvDTQnpXvHCNvrTOuCQ"
      );

      setRecipe(fetchedRecipe);
    } catch (error) {
      console.log(error);
    }
  };

  // refetch recipe on focus screen + only fetch once when opening screen
  useFocusEffect(
    useCallback(() => {
      resolveRecipe();
    }, []),
  );

  return (
    <ScrollView>
      <Frame withSubPageHeader>
        <Image
          style={{ width: '100%', height: 200, borderRadius: 10 }}
          source={{
            uri: recipe?.image,
          }}
        />
        <Text>Title: {recipe?.title}</Text>
        <Text>Cooking time: {recipe?.readyInMinutes} min</Text>

        <View style={{marginBottom: spacing.l}}>
          {/* TODO: add serving buttons here! */}
          {/* TODO: create component for servings here */}
          <Text style={typography.subtitle2}>Ingredients:</Text>
          {recipe?.extendedIngredients.map(ingredient => {
            return (
              <Text style={typography.body}>{`${Math.floor(ingredient.measures.metric.amount)} ${
                  ingredient.measures.metric.unitShort
                } ${ingredient.name}`}
              </Text>
            );
          })}
        </View>

        <View>
          <Text style={typography.subtitle2}>Instructions:</Text>
          {recipe?.analyzedInstructions[0].steps.map((step, index) => {
            return (
              <View>
                <Text style={[typography.overline, {marginTop: spacing.xs, marginBottom: spacing.xxs}]}>Step {step.number}</Text>
                <Instruction>{step.step}</Instruction>
              </View>
            );
          })}
        </View>

        <AppButton 
          // TODO: finish dinner action
          onPress={() => {}} 
          title={"FINISH DINNER"} 
          type={AppButtonType.primary} 
          style={{marginTop: spacing.l}}
        />
      </Frame>
    </ScrollView>
  );
};
