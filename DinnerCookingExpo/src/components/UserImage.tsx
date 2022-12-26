import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {colors} from '../styles/Color';
import {alphabete} from '../utils/alphabete';
import {typography} from '../styles/Typography';

type UserImageProps = {
  imageUrl?: string;
  name: string;
};

const colorCollection = [
  colors.primary,
  colors.primaryDark,
  colors.secondary,
  colors.primaryLight,
];

export const UserImage = (props: UserImageProps) => {
  // get letter index
  const firstLetter = props.name[0];
  const letterIndex = alphabete.findIndex(
    element => element === firstLetter.toLowerCase(),
  );

  const alternativeColor =
    colorCollection[letterIndex % colorCollection.length];

  return (
    // TODO: get image from google cloud!
    <View>
      {props.imageUrl ? (
        <Image
          style={styles.image}
          source={{
            uri: props.imageUrl,
          }}
        />
      ) : (
        <View style={[styles.alternative, {borderColor: alternativeColor}]}>
          <Text style={[typography.subtitle2, {color: alternativeColor}]}>
            {props.name?.charAt(0).toUpperCase()}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {width: 40, height: 40, borderRadius: 40},
  alternative: {
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
});
