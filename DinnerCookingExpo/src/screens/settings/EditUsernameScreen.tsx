import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { AppButton } from '../../components/Button';
import { Frame } from '../../components/Frame';
import { AppInput } from '../../components/Input';
import DatabaseContext from '../../contexts/DatabaseContext';
import { AppButtonType } from '../../interfaces/Button';
import { spacing } from '../../styles/Spacing';
import { typography } from '../../styles/Typography';
import ParamList from '../../utils/ParameterDefinitions';
import CheckIcon from '../../assets/icons/check.svg';
import { setNameOfUser } from '../../utils/userRequests';

export const EditUsernameScreen = () => {
  const dbContext = useContext(DatabaseContext);
  const db = dbContext.database;
  const navigator = useNavigation();

  const route = useRoute<RouteProp<ParamList, 'EditUsernameScreen'>>();
  const userId: string = route.params.userId;

  const [username, setUsername] = useState<string>(route.params.name);
  const errorMessage: string = 'Username cannot be empty';

  const saveUsername = () => {
    setNameOfUser(db, userId, username).then(() => {
      navigator.goBack();
    });
  };

  const isValid = () => {
    if (username.length == 0) return false;
    return true;
  };

  return (
    <Frame withBottomNavBar withSubPageHeader>
      <Text style={[typography.body, styles.description]}>
        Choose a username that is visible to others and that your friends can
        use to find you
      </Text>
      <AppInput
        style={styles.input}
        label="Username"
        value={username}
        onChangeText={setUsername}
        errorMessage={isValid() ? undefined : errorMessage}></AppInput>
      <AppButton
        type={AppButtonType.primary}
        title="save"
        iconOnly
        onPress={saveUsername}
        logoSVG={CheckIcon}
        style={styles.button}
        disabled={isValid() ? false : true}
      />
    </Frame>
  );
};

const styles = StyleSheet.create({
  description: {
    marginVertical: spacing.xs,
  },
  input: {
    marginTop: spacing.m,
  },
  button: {
    position: 'absolute',
    bottom: spacing.m,
    right: spacing.m,
  },
});
