import React from 'react';
import {StyleSheet} from 'react-native';
import {colors} from './Color';

export const typography = StyleSheet.create({
  h1: {
    fontSize: 64,
    lineHeight: 80,
    fontFamily: 'ArvoBoldItalic',
    color: colors.text,
  },
  h2: {
    fontSize: 48,
    lineHeight: 60,
    fontFamily: 'ArvoBoldItalic',
    color: colors.text,
  },
  h3: {
    fontSize: 36,
    lineHeight: 45,
    fontFamily: 'ArvoBoldItalic',
    color: colors.text,
  },
  h4: {
    fontSize: 24,
    lineHeight: 30,
    fontFamily: 'ArvoBoldItalic',
    color: colors.text,
  },

  subtitle1: {
    fontSize: 20,
    lineHeight: 27,
    fontFamily: 'ExoRegular',
    color: colors.text,
  },
  subtitle2: {
    fontSize: 16,
    lineHeight: 21,
    fontFamily: 'ExoSemiBold',
    color: colors.text,
  },
  button: {
    fontSize: 16,
    lineHeight: 21,
    fontFamily: 'ExoMedium',
    color: colors.text,
    letterSpacing: 1.25,
  },
  overline: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: 'ExoBold',
    color: colors.text,
    letterSpacing: 1.5,
  },
  body: {
    fontSize: 16,
    lineHeight: 21,
    fontFamily: 'ExoRegular',
    color: colors.text,
    letterSpacing: 0.15,
  },
  body2: {
    fontSize: 10,
    lineHeight: 13,
    fontFamily: 'ExoRegular',
    color: colors.text,
    letterSpacing: 0.15,
  },
  link: {
    fontSize: 16,
    lineHeight: 21,
    fontFamily: 'ExoRegular',
    color: colors.primary,
    letterSpacing: 0.15,
    textDecorationLine: 'underline',
  },
  error: {
    fontSize: 16,
    lineHeight: 21,
    fontFamily: 'ExoRegular',
    color: colors.error,
    letterSpacing: 0.15,
  },
});
