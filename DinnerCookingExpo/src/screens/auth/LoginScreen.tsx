import React, { useContext, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import UserContext from '../../contexts/UserContext';
import { AuthErrorCodes, signInWithEmailAndPassword } from 'firebase/auth';
import { Frame } from '../../components/Frame';
import { authStyles } from '../../styles/Auth.styles';
import { typography } from '../../styles/Typography';
import { AppInput } from '../../components/Input';
import { FirebaseError } from 'firebase/app';
import { AppButton } from '../../components/Button';
import { AppButtonType } from '../../interfaces/Button';
import { LineWithText } from '../../components/LineWithText';
import { colors } from '../../styles/Color';

export const LoginScreen = ({ navigation }) => {
  const userContext = useContext(UserContext);

  const [email, setEmail] = useState<string>('jon.fischerboy@gmail.com');
  const [password, setPassword] = useState<string>('jonrocktrot');
  const [emailErrorText, setEmailErrorText] = useState<string>('');
  const [passwordErrorText, setPasswordErrorText] = useState<string>('');

  const onSubmitCredentials = async () => {
    signInWithEmailAndPassword(userContext.auth, email, password)
      .then(userData => {
        userContext.setUserData(userData.user);
      })
      .catch((error: FirebaseError) => {
        switch (error.code) {
          case AuthErrorCodes.CREDENTIAL_MISMATCH:
            setPasswordErrorText('Email or Password is wrong!');
            break;

          case AuthErrorCodes.TIMEOUT:
            setEmailErrorText(
              'The request took too long please try again later!',
            );
            break;

          default:
            setEmailErrorText('unexpected error!');
            break;
        }
      });
  };

  const navigateRegister = () => {
    navigation.replace('Register');
  };

  return (
    <ScrollView>
      <Frame>
        <View style={authStyles.textWrapper}>
          <Text style={[typography.h3, authStyles.heading]}>Login</Text>
          <Text style={typography.body}>
            dakjsdkasjhdkajsdaskhd askjdh askjdh askjdh askjdh askjdh
            askjdhaksjdh askjd
          </Text>
        </View>

        {/* Login Form */}
        <View style={authStyles.inputWrapper}>
          <View style={authStyles.input}>
            <AppInput
              label="Email"
              keyboardType="email-address"
              textContentType="emailAddress"
              value={email}
              onChangeText={(text: string) => {
                setEmail(text);
                setEmailErrorText('');
              }}
              errorMessage={emailErrorText}
            />
          </View>
          <View style={authStyles.input}>
            <AppInput
              label="Password"
              keyboardType="default"
              textContentType="newPassword"
              hideable={true}
              value={password}
              errorMessage={passwordErrorText}
              onChangeText={text => {
                setPassword(text);
                setPasswordErrorText('');
              }}
            />
          </View>
        </View>

        {/* Login Button */}
        <AppButton
          title="Login"
          type={AppButtonType.primary}
          onPress={onSubmitCredentials}
        />
        {/* Subtitle */}
        <View style={authStyles.textContainer}>
          <LineWithText>Or Sign In With</LineWithText>
        </View>
        {/* Google oAuth and Facebook oAuth */}
        <View style={authStyles.oAuthWrapper}>
          <View style={[authStyles.oAuthButton, authStyles.oAuthGoogle]}>
            <AppButton
              title="GOOGLE"
              type={AppButtonType.secondary}
              logoURI={
                'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1024px-Google_%22G%22_Logo.svg.png'
              }
            />
          </View>
          <View style={[authStyles.oAuthButton, authStyles.oAuthFacebook]}>
            <AppButton
              title="FACEBOOK"
              type={AppButtonType.secondary}
              logoURI={
                'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/150px-Facebook_f_logo_%282019%29.svg.png'
              }
            />
          </View>
        </View>
        <View style={authStyles.textContainer}>
          <Text
            style={[typography.link, { color: colors.primary }]}
            onPress={navigateRegister}>
            Don't have an account? Create one here
          </Text>
        </View>
      </Frame>
    </ScrollView>
  );
};
