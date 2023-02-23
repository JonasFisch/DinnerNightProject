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

  const [allergies, setAllergies] = useState<string[]>(["soy", "nuts", "bananas", "tomatos", "mushrooms"]);

  const nextStep = () => {
    // TODO: go to next Step with navigation.navigate('routename')
  };

  const finishIntro = async () => {
    if (!userContext.currentUser) {
      throw new Error("user not authenticated");
    }
    await finishIntroOfUser(db, userContext.currentUser.uid);
  };

  const removeAllergie = (value: string) => {
    const newAllergies = allergies.filter(
      element => element !== value,
    );
    setAllergies(newAllergies);
  };

  const renderChip = item => (
    <Chip withAvatar={false} style={styles.chip} label={item} onPress={() => removeAllergie(item)} />
  );

  return (
    <Frame>
      <View style={styles.contentWrapper}>
        <Text style={[styles.headline, typography.h3]}>Specify Allergies</Text>
        <Text style={typography.body}>
          dakjsdkasjhdkajsdaskhd askjdh askjdh askjdh askjdh askjdh
          askjdhaksjdh askjd
        </Text>
        <View style={styles.allergiesWrapper}>
          {allergies.map(item => (<Chip withAvatar={false} style={styles.chip} label={item} onPress={() => removeAllergie(item)} />))}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          onPress={() => { }}
          title="I have no allergies"
          type={AppButtonType.text}
        />
        <View style={styles.horizontalButtonContainer}>
          <AppButton
            style={[styles.button, { marginRight: spacing.m }]}
            onPress={() => { }}
            title="back"
            type={AppButtonType.secondary}
          />
          <AppButton
            style={styles.button}
            onPress={nextStep}
            title="next"
            type={AppButtonType.primary}
          />
        </View></View>
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
    display: "flex",
    justifyContent: "space-between",
  },
  horizontalButtonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.s,
  },
  button: {
    flex: 1,
  },
  chip: {
    marginBottom: spacing.m,
  },
  allergiesWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: spacing.xl,

  }
});
