import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useUserContext } from '../../contexts/UserContext';
import { AuthErrorCodes } from 'firebase/auth';
import { AppInput } from '../../components/Input';
import { AppButton } from '../../components/Button';
import { AppButtonType } from '../../interfaces/Button';
import { typography } from '../../styles/Typography';
import { Frame } from '../../components/Frame';
import { LineWithText } from '../../components/LineWithText';
import { FirebaseError } from 'firebase/app';
import { authStyles } from '../../styles/Auth.styles';
import { colors } from '../../styles/Color';

const passwordRules =
  'required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8;';

export const RegisterScreen = ({ navigation }) => {
  const userContext = useUserContext();

  const navigateLogin = () => {
    navigation.replace('Login');
  };

  // states
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  // const [email, setEmail] = useState<string>('yixan77675@v2ssr.com');
  // const [password, setPassword] = useState<string>('test123');
  // const [passwordConfirm, setPasswordConfirm] = useState<string>('test123');
  const [passwordErrorText, setPasswordErrorText] = useState<string>('');
  const [emailErrorText, setEmailErrorText] = useState<string>('');

  // TODO: also use google + Github oauth!
  const register = () => {
    userContext.signup(email, password).catch((error: FirebaseError) => {
      // email already in use or other auth error
      switch (error.code) {
        case AuthErrorCodes.CREDENTIAL_ALREADY_IN_USE:
        case AuthErrorCodes.EMAIL_EXISTS:
          setEmailErrorText('Email is already in use!');
          break;

        case AuthErrorCodes.CREDENTIAL_MISMATCH:
          setEmailErrorText('Passwords does not match!');
          break;

        case AuthErrorCodes.TIMEOUT:
          setEmailErrorText(
            'The request took too long please try again later!',
          );
          break;

        case AuthErrorCodes.INVALID_EMAIL:
          setEmailErrorText('Email is not valid.');
          break;

        case AuthErrorCodes.WEAK_PASSWORD:
          // TODO: state password requirements here
          setPasswordErrorText('password too weak.');
          break;
        default:
          setEmailErrorText('unexpected error!');
          break;
      }
    });
  };

  const checkPasswords = () => {
    if (password !== passwordConfirm) {
      setPasswordErrorText('Passwords does not match!');
    } else {
      setPasswordErrorText('');
    }
  };

  return (
    <ScrollView>
      <Frame>
        <View style={authStyles.textWrapper}>
          <Text style={[typography.h3, authStyles.heading]}>
            Create an Account
          </Text>
          <Text style={typography.body}>
            Please register an account with your email address and choose a
            password
          </Text>
        </View>

        {/* Register Form */}
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
              onChangeText={text => {
                setPassword(text);
                setPasswordErrorText('');
              }}
            />
          </View>
          <View style={authStyles.input}>
            <AppInput
              label="Repeat Password"
              keyboardType="default"
              textContentType="newPassword"
              onEndEdit={checkPasswords}
              hideable={true}
              value={passwordConfirm}
              onChangeText={text => {
                setPasswordConfirm(text);
                setPasswordErrorText('');
              }}
              errorMessage={passwordErrorText}
            />
          </View>
        </View>

        {/* Register Button */}
        <AppButton
          title="SIGN UP"
          type={AppButtonType.primary}
          onPress={register}
        />

        {/* Subtitle */}
        <View style={authStyles.textContainer}>
          <LineWithText>Or Sign Up With</LineWithText>
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
              onPress={() => {
                /* TODO */
              }}
            />
          </View>
          <View style={[authStyles.oAuthButton, authStyles.oAuthFacebook]}>
            <AppButton
              title="FACEBOOK"
              type={AppButtonType.secondary}
              logoURI={
                'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/150px-Facebook_f_logo_%282019%29.svg.png'
              }
              onPress={() => {
                /* TODO */
              }}
            />
          </View>
        </View>
        <View style={authStyles.textContainer}>
          <Text
            style={[typography.link, { color: colors.primary }]}
            onPress={navigateLogin}>
            Already have an account? Sign In
          </Text>
        </View>
      </Frame>
    </ScrollView>
  );
};
