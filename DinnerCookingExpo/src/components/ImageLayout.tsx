import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { AppButtonType } from '../interfaces/Button';
import { spacing } from '../styles/Spacing';
import { typography } from '../styles/Typography';
import { AppButton } from './Button';
import { Frame } from './Frame';

type ImageLayoutProps = {
  ImageSVG: React.FC<SvgProps>;
  headline: string;
  description: string;
  actionButtonLabel: string;
  actionButtonClickHandler: () => void;
};

export const ImageLayout = ({
  ImageSVG,
  headline,
  description,
  actionButtonLabel,
  actionButtonClickHandler,
}: ImageLayoutProps) => {
  return (
    <Frame>
      <View style={styles.imageWrapper}>
        <ImageSVG width={'100%'} />
      </View>
      <Text style={typography.h3}>{headline}</Text>
      <Text style={[typography.body, styles.description]}>{description}</Text>
      <AppButton
        type={AppButtonType.primary}
        title={actionButtonLabel}
        onPress={actionButtonClickHandler}
      />
    </Frame>
  );
};

const styles = StyleSheet.create({
  description: {
    marginVertical: spacing.xl,
  },
  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
});
