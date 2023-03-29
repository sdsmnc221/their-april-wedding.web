import './SplashScreen.scss';

import Background from '@elements/Background/Background';
import Frame from '@elements/Frame/Frame';
import Logo from '@elements/Logo/Logo';
import Overlay from '@elements/Overlay/Overlay';
import Subtitle from '@elements/Subtitle/Subtitle';
import ScrollDown from '@elements/ScrollDown/ScrollDown';

import React, { useContext, useEffect } from 'react';
import { globalContext } from '@contexts/GlobalContext';
import { useNavigate } from 'react-router-dom';

const SplashScreen: React.FC = () => {
  const { data, setCurrentScene } = useContext(globalContext);

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentScene('00-splash-screen');
  }, []);

  return (
    <div className="splash-screen">
      <Background type="video" src="/images/intro-video.mp4" />
      <Overlay />
      <Frame isLogo />
      <Subtitle content={data.scenes['00-splash-screen'].subtitle} />
      <Logo />
      <ScrollDown text={data.scenes['00-splash-screen'].cta} onClick={() => navigate('/scene/01-preface')} />
    </div>
  );
};

export default SplashScreen;
