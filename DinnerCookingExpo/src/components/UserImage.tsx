import React, {useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {colors} from '../styles/Color';
import {alphabete} from '../utils/alphabete';
import {typography} from '../styles/Typography';
import StorageContext from '../contexts/StorageContext';
import {getDownloadURL, ref, StorageError} from 'firebase/storage';
import {FirebaseError} from 'firebase/app';

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

/**
 * Show the given user image, when there is no user image given an alternative appearance (depending on the first letter of the name) is shown.
 * The loading strategie ist the folling: the alternative image is shown until the firebase image url is available
 * TODO: could be improved by suspense boundaries!
 * @param props contains image url and the users name
 * @returns React Component
 */
export const UserImage = (props: UserImageProps) => {
  const [imageURL, setImageURL] = useState('');
  const [hasUserImage, setHasUserImage] = useState(false);

  // get letter index
  const firstLetter = props.name[0];
  const letterIndex = alphabete.findIndex(
    element => element === firstLetter.toLowerCase(),
  );

  const storage = useContext(StorageContext).storage;

  const fetchImageURL = () => {
    console.log(props.imageUrl);

    const pathReference = ref(storage, props.imageUrl);

    getDownloadURL(pathReference)
      .then(data => {
        setImageURL(data);
        setHasUserImage(true);
      })
      .catch((error: StorageError) => {
        // if there was an error while fetching user image fallback to alternative user image
        setHasUserImage(false);
        console.warn('error while fetching user image: ' + error.message);
      });
  };

  if (props.imageUrl) {
    fetchImageURL();
  }

  const alternativeColor =
    colorCollection[letterIndex % colorCollection.length];

  return (
    <View>
      {hasUserImage ? (
        <Image
          style={styles.image}
          source={{
            uri: imageURL,
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
