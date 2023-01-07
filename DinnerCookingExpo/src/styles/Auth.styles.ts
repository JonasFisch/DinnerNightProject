import { StyleSheet } from 'react-native';
import { spacing } from './Spacing';

export const authStyles = StyleSheet.create({
  textWrapper: {
    marginBottom: spacing.xxl,
  },
  heading: {
    marginBottom: spacing.l,
  },
  inputWrapper: {
    marginBottom: spacing.xs,
  },
  input: {
    marginBottom: spacing.xxl,
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
    marginLeft: spacing.m,
  },
  oAuthGoogle: {
    marginRight: spacing.m,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    // 15 : margin of the button
    marginTop: spacing.xxl,
    marginBottom: spacing.xl,
  },
});
