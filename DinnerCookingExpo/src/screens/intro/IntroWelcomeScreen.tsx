import React from 'react';
import { ImageLayout } from '../../components/ImageLayout';
import StartSvg from '../../assets/graphics/startIntro.svg';

export const IntroWelcomeScreen = ({ navigation }) => {
  const navigateToSteps = () => {
    navigation.navigate('Steps');
  };
  return (
    <ImageLayout
      ImageSVG={StartSvg}
      headline="Set your eating preferences"
      description="To suggest the right recipes for your dinners, we need to know about your allergies, diets and unwanted ingredients"
      actionButtonLabel="Let's go!"
      actionButtonClickHandler={navigateToSteps}
    />
  );
};
