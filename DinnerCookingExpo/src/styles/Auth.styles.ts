import {StyleSheet} from 'react-native';

export const authStyles = StyleSheet.create({
  textWrapper: {
    marginBottom: 48,
  },
  heading: {
    marginBottom: 20,
  },
  inputWrapper: {
    marginBottom: 8,
  },
  input: {
    marginBottom: 40,
  },
  oAuthWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  oAuthButton: {
    flex: 0.5,
    //gap: 10, // only supported in React 0.70!
  },
  oAuthFacebook: {
    marginLeft: 15,
  },
  oAuthGoogle: {
    marginRight: 15,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    // 15 : margin of the button
    marginTop: 36,
    marginBottom: 32,
  },
});
