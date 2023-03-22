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
      description="ahsfhal lfjas flkajsflksaj lkasjf lkasjf lkas sjhgajd asjhd asjhgd asjhgd ashdg asjhdg ashdg ashgd ashgd jh"
      actionButtonLabel="Let's go!"
      actionButtonClickHandler={navigateToSteps}
    />
  );
};
