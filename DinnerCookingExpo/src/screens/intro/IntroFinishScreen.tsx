import React, { useContext } from 'react';
import { ImageLayout } from '../../components/ImageLayout';
import DatabaseContext from '../../contexts/DatabaseContext';
import { useUserContext } from '../../contexts/UserContext';
import { finishIntroOfUser } from '../../utils/userRequests';
import FinishSvg from '../../assets/graphics/finishIntro.svg';

export const IntroFinishScreen = () => {
  const userContext = useUserContext();
  const dbContext = useContext(DatabaseContext);
  const db = dbContext.database;

  const finishIntro = async () => {
    if (!userContext.currentUser) {
      throw new Error('user not authenticated');
    }
    await finishIntroOfUser(db, userContext.currentUser.uid);
  };

  return (
    <ImageLayout
      ImageSVG={FinishSvg}
      headline="Finished!"
      description="ahsfhal lfjas flkajsflksaj lkasjf lkasjf lkas sjhgajd asjhd asjhgd asjhgd ashdg asjhdg ashdg ashgd ashgd jh"
      actionButtonLabel="Get Started"
      actionButtonClickHandler={finishIntro}
    />
  );
};
