import React from 'react';
import {
  GestureResponderEvent,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { sizes } from '../../styles/Sizes';
import OpenIcon from '../../assets/icons/open_in_new.svg';
import { typography } from '../../styles/Typography';
import { colors } from '../../styles/Color';
import { RadioButton } from '../RadioButton';
import { spacing } from '../../styles/Spacing';
type CarouselItemProps = {
  name: string;
  selected: boolean;
  active: boolean;
  voting?: { total: number; voted: number };
  duration?: number;
  hideSelected?: boolean;
  imageURL?: string;
  onThumbnailPressed?: (event: GestureResponderEvent) => void;
  onExpandClicked?: (event: GestureResponderEvent) => void;
};

export const CarouselItem = (props: CarouselItemProps) => {
  return (
    <View style={[styles.carouselItem, props.active && styles.selected]}>
      <Pressable onPress={props.onThumbnailPressed}>
        <Image
          style={styles.thumbnail}
          source={{
            uri: props.imageURL,
          }}
        />
      </Pressable>
      <Pressable style={styles.footer} onPress={props.onExpandClicked}>
        <View style={styles.description}>
          <Text style={[typography.subtitle2, { marginBottom: spacing.xxs }]}>
            {props.name}
          </Text>
          <Text style={typography.body2}>Duration: {props.duration} minutes</Text>
        </View>
        {props.voting ? (
          <View style={styles.voting}>
            <Text
              style={[
                typography.overline,
                { marginBottom: spacing.xxs },
              ]}>{`${props.voting.voted} / ${props.voting.total}`}</Text>
            <Text style={typography.body2}>Votes</Text>
          </View>
        ) : (
          <OpenIcon width={24} height={24} style={{ fill: colors.textLight }} />
        )}
      </Pressable>
      {!props.hideSelected && (
        <View style={styles.radioWrapper}>
          <RadioButton
            selected={props.selected}
            onPress={props.onThumbnailPressed}></RadioButton>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  carouselItem: {
    backgroundColor: colors.white,
    height: '100%',
    width: '100%',
    borderRadius: sizes.borderRadius,
    flex: 1,
    borderWidth: 1,
    borderColor: colors.textLight,
  },
  selected: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  radioWrapper: { position: 'absolute', top: 8, left: 8 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    padding: 12,
    borderBottomEndRadius: sizes.borderRadius - 2,
    borderBottomStartRadius: sizes.borderRadius - 2,
  },
  description: {
    flexDirection: 'column',
  },
  thumbnail: {
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
    borderRadius: sizes.borderRadius - 2,
  },
  voting: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
