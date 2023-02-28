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
import { finishIntroOfUser } from '../../utils/userRequests';

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

  const nextStep = () => {
    if (step == preferenceConfig.length - 1) {
      // TODO: navigate to Finish Screen
    } else {
      setStep(step + 1);
    }
  };

  const backStep = () => {
    if (step == 0) {
      // TODO: navigate to Welcome Screen
    } else {
      setStep(step - 1);
    }
  };

  const NoItemsSpecified = () => {
    preferenceConfig[step].changeHandler([]);
    nextStep();
  };

  const finishIntro = async () => {
    if (!userContext.currentUser) {
      throw new Error('user not authenticated');
    }
    await finishIntroOfUser(db, userContext.currentUser.uid);
  };

  const removeAllergie = (value: string) => {
    const newAllergies = allergies.filter(element => element !== value);
    setAllergies(newAllergies);
  };

  const renderChip = (item: string) => (
    <Chip
      withAvatar={false}
      key={item}
      style={styles.chip}
      label={item}
      onPress={() => removeAllergie(item)}
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
          onPress={NoItemsSpecified}
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
