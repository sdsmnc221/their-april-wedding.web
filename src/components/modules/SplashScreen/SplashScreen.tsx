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

  const scene = data.scenes['00-splash-screen'];

  useEffect(() => {
    setCurrentScene('00-splash-screen');
  }, []);

  return (
    <div className="splash-screen">
      <Background type="video" src={scene.bg} />
      <Overlay />
      <Frame isLogo />
      <Subtitle content={scene.subtitle} />
      <Logo />
      <ScrollDown text={scene.cta} onClick={() => navigate(`/scene/${scene.nextScene}`)} />
    </div>
  );
};

export default SplashScreen;
