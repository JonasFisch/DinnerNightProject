import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppButton } from '../../components/Button';
import { Chip } from '../../components/Chip';
import { Frame } from '../../components/Frame';
import DatabaseContext from '../../contexts/DatabaseContext';
import { useUserContext } from '../../contexts/UserContext';
import { AppButtonType } from '../../interfaces/Button';
import { spacing } from '../../styles/Spacing';
import { typography } from '../../styles/Typography';
import {
  setAllergiesOfUser,
  setDietsOfUser,
  setUnwantedIngredientsOfUser,
} from '../../utils/userRequests';

export const StepScreen = ({ navigation }) => {
  const userContext = useUserContext();
  const dbContext = useContext(DatabaseContext);
  const db = dbContext.database;

  const [step, setStep] = useState<number>(0);

  const [allergies, setAllergies] = useState<string[]>([
    'soy',
    'nuts',
    'bananas',
    'tomatos',
    'mushrooms',
  ]);

  const [diets, setDiets] = useState<string[]>(['vegetarian']);

  const [unwantedIngredients, setUnwantedIngredients] = useState<string[]>([
    'apples',
    'carrots',
    'mushrooms',
  ]);

  const preferenceConfig = [
    {
      title: 'Allergies',
      items: allergies,
      changeHandler: setAllergies,
    },
    {
      title: 'Diet',
      items: diets,
      changeHandler: setDiets,
    },
    {
      title: 'Unwanted Ingredients',
      items: unwantedIngredients,
      changeHandler: setUnwantedIngredients,
    },
  ];

  const savePreferences = async () => {
    if (!userContext.currentUser) {
      throw new Error('user not authenticated');
    }
    Promise.all([
      await setAllergiesOfUser(db, userContext.currentUser.uid, allergies),
      await setDietsOfUser(db, userContext.currentUser.uid, diets),
      await setUnwantedIngredientsOfUser(
        db,
        userContext.currentUser.uid,
        unwantedIngredients,
      ),
    ]);
  };

  const nextStep = () => {
    if (step == preferenceConfig.length - 1) {
      savePreferences()
        .then(() => {
          navigation.navigate('Finish');
        })
        .catch(error => {
          console.log('error during setting of eating preferences: ', error);
        });
    } else {
      setStep(step + 1);
    }
  };

  const backStep = () => {
    if (step == 0) {
      navigation.navigate('Welcome');
    } else {
      setStep(step - 1);
    }
  };

  const noItemsSpecified = () => {
    preferenceConfig[step].changeHandler([]);
    nextStep();
  };

  const removeItem = (value: string) => {
    const newItems = preferenceConfig[step].items.filter(
      element => element !== value,
    );
    preferenceConfig[step].changeHandler(newItems);
  };

  const renderChip = (item: string) => (
    <Chip
      withAvatar={false}
      key={item}
      style={styles.chip}
      label={item}
      onPress={() => removeItem(item)}
    />
  );

  return (
    <Frame>
      <View style={styles.contentWrapper}>
        <Text style={[styles.headline, typography.h3]}>
          Specify {preferenceConfig[step].title}
        </Text>
        <Text style={typography.body}>
          dakjsdkasjhdkajsdaskhd askjdh askjdh askjdh askjdh askjdh askjdhaksjdh
          askjd
        </Text>
        {preferenceConfig[step].items.length == 0 ? (
          <Text style={[typography.overline, styles.noItemsText]}>
            You haven't selected any {preferenceConfig[step].title}
          </Text>
        ) : (
          <View style={styles.itemWrapper}>
            {preferenceConfig[step].items.map(renderChip)}
          </View>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          onPress={noItemsSpecified}
          title={`No ${preferenceConfig[step].title}`}
          type={AppButtonType.text}
        />
        <View style={styles.horizontalButtonContainer}>
          <AppButton
            style={[styles.button, { marginRight: spacing.m }]}
            onPress={backStep}
            title="back"
            type={AppButtonType.secondary}
          />
          <AppButton
            style={styles.button}
            onPress={nextStep}
            title="next"
            type={AppButtonType.primary}
          />
        </View>
      </View>
    </Frame>
  );
};
const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
  },
  headline: {
    marginBottom: spacing.xl,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  horizontalButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.s,
  },
  button: {
    flex: 1,
  },
  chip: {
    marginBottom: spacing.m,
  },
  itemWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.xl,
  },
  noItemsText: {
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});
