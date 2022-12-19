import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {colors} from '../styles/Color';

type UserImageProps = {
  // userId: string;
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
  const alternativeColor =
    colorCollection[Number(Math.floor(Math.random() * colorCollection.length))];

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
        <View style={[styles.alternative, {backgroundColor: alternativeColor}]}>
          <Text style={{color: colors.textWhite}}>
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
  },
});
