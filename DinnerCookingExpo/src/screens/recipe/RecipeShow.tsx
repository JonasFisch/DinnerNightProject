import { useFocusEffect } from '@react-navigation/native';
import { doc } from 'firebase/firestore/lite';
import { ref } from 'firebase/storage';
import React, { useCallback, useContext, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { Frame } from '../../components/Frame';
import DatabaseContext from '../../contexts/DatabaseContext';
import { Recipe } from '../../interfaces/FirebaseSchema';
import { typography } from '../../styles/Typography';
import { fetchRecipe } from '../../utils/dinnerRequests';

export const RecipeShow = () => {
  const [recipe, setRecipe] = useState<Recipe>();

  const db = useContext(DatabaseContext).database;

  const resolveRecipe = async () => {
    try {
      const fetchedRecipe = await fetchRecipe(
        db,
        doc(db, 'Recipes', 'ASvDTQnpXvHCNvrTOuCQ'),
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
      <Frame withBottomNavBar>

        <Image
          style={{ width: '100%', height: 200, borderRadius: 10 }}
          source={{
            uri: recipe?.image,
          }}
        />
        <Text>Title: {recipe?.title}</Text>
        <Text>Cooking time: {recipe?.readyInMinutes} min</Text>

        <View>
          {/* TODO: add serving buttons here! */}
          <Text style={typography.subtitle2}>Ingredients:</Text>
          {recipe?.extendedIngredients.map(ingredient => {
            return (
              <Text>{`${Math.floor(ingredient.measures.metric.amount)} ${
                ingredient.measures.metric.unitShort
              } ${ingredient.name}`}</Text>
            );
          })}
        </View>

        <View>
          <Text style={typography.subtitle2}>Instructions:</Text>
          {recipe?.analyzedInstructions[0].steps.map((step, index) => {
            return (
              <View>
                <Text style={typography.subtitle2}>Step {step.number}</Text>
                <Text>{step.step}</Text>
              </View>
            );
          })}
        </View>

        <Text>Recipe Screen! Yeahy (WIP)</Text>
      </Frame>
    </ScrollView>
  );
};
