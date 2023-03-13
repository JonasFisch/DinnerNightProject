import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppButton } from '../../components/Button';
import { Chip } from '../../components/Chip';
import { Frame } from '../../components/Frame';
import { AppInput } from '../../components/Input';
import { SelectableListEntry } from '../../components/SelectableList';
import { Stepper } from '../../components/Stepper';
import DatabaseContext from '../../contexts/DatabaseContext';
import { useUserContext } from '../../contexts/UserContext';
import { AppButtonType } from '../../interfaces/Button';
import { spacing } from '../../styles/Spacing';
import { typography } from '../../styles/Typography';
import {
  setAllergiesOfUser,
  setDietsOfUser,
  setNameOfUser,
  setUnwantedIngredientsOfUser,
} from '../../utils/userRequests';
import { EatingPreferenceType } from '../preferences/AddEatingPreferenceScreen';

export const StepScreen = ({ navigation }) => {
  const userContext = useUserContext();
  const dbContext = useContext(DatabaseContext);
  const db = dbContext.database;

  const [step, setStep] = useState<number>(0);

  const [allergies, setAllergies] = useState<string[]>([]);
  const [diets, setDiets] = useState<string[]>([]);
  const [unwantedIngredients, setUnwantedIngredients] = useState<string[]>([]);

  const [username, setUsername] = useState<string>('');

  const preferenceConfig = [
    {
      title: 'Username',
      description:
        'dakjsdkasjhdkajsdaskhd askjdh askjdh askjdh askjdh askjdh askjdhaksjdh askjd',
      items: [],
      changeHandler: () => {},
      type: null,
    },
    {
      title: 'Allergies',
      description:
        'dakjsdkasjhdkajsdaskhd askjdh askjdh askjdh askjdh askjdh askjdhaksjdh askjd',
      items: allergies,
      changeHandler: setAllergies,
      type: EatingPreferenceType.allergies,
    },
    {
      title: 'Diet',
      description:
        'dakjsdkasjhdkajsdaskhd askjdh askjdh askjdh askjdh askjdh askjdhaksjdh askjd',
      items: diets,
      changeHandler: setDiets,
      type: EatingPreferenceType.diets,
    },
    {
      title: 'Unwanted Ingredients',
      description:
        'dakjsdkasjhdkajsdaskhd askjdh askjdh askjdh askjdh askjdh askjdhaksjdh askjd',
      items: unwantedIngredients,
      changeHandler: setUnwantedIngredients,
      type: EatingPreferenceType.unwantedIngredients,
    },
  ];

  const savePreferences = async () => {
    // TODO: check if anything needs to be saved
    if (!userContext.currentUser) {
      throw new Error('user not authenticated');
    }
    if (
      userContext.userDetails?.name == username &&
      userContext.userDetails?.allergies == allergies &&
      userContext.userDetails?.diets == diets &&
      userContext.userDetails?.unwantedIngredients == unwantedIngredients
    )
      return;
    Promise.all([
      await setNameOfUser(db, userContext.currentUser.uid, username),
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

  const handleSearchInputFocus = () => {
    const listItems: SelectableListEntry[] = preferenceConfig[step].items.map(
      item => ({
        id: item,
        label: item,
      }),
    );
    navigation.navigate('AddEatingPreferences', {
      type: preferenceConfig[step].type,
      preselectedItems: listItems,
    });
  };

  useEffect(() => {
    if (!userContext.userDetails) {
      return;
    }

    setUsername(userContext.userDetails.name);
    setAllergies(userContext.userDetails.allergies);
    setDiets(userContext.userDetails.diets);
    setUnwantedIngredients(userContext.userDetails.unwantedIngredients);
  }, [userContext.userDetails]);

  return (
    <Frame>
      <View style={styles.contentWrapper}>
        <Stepper
          currentStep={step}
          totalStepCount={4}
          onCurrentStepChange={() => {}}
          style={styles.stepper}></Stepper>
        <Text style={[styles.headline, typography.h3]}>
          {step == 0
            ? "What's your name?"
            : 'Specify' + preferenceConfig[step].title}
        </Text>
        <Text style={typography.body}>
          {preferenceConfig[step].description}
        </Text>
        {step == 0 ? (
          <AppInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            label={'Username'}
            clearable={true}
          />
        ) : (
          <View>
            <AppInput
              style={styles.input}
              value={''}
              onChangeText={() => {}}
              customOnFokus={handleSearchInputFocus}
              label={'Search'}
              clearable={true}
            />
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
        )}
      </View>
      <View style={styles.buttonContainer}>
        {step > 0 && (
          <AppButton
            onPress={noItemsSpecified}
            title={`No ${preferenceConfig[step].title}`}
            type={AppButtonType.text}
          />
        )}
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
    marginVertical: spacing.xl,
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
  },
  noItemsText: {
    textAlign: 'center',
  },
  input: {
    marginVertical: spacing.xl,
  },
  stepper: {
    marginTop: spacing.s,
  },
});
