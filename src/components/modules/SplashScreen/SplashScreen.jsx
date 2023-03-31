import './SplashScreen.scss';

import Background from '@elements/Background/Background';
import Frame from '@elements/Frame/Frame';
import Logo from '@elements/Logo/Logo';
import Overlay from '@elements/Overlay/Overlay';
import Subtitle from '@elements/Subtitle/Subtitle';
import ScrollDown from '@elements/ScrollDown/ScrollDown';
import Menu from '@elements/Menu/Menu';
import SoundToggle from '@elements/SoundToggle/SoundToggle';

import React, { useContext, useEffect } from 'react';
import { globalContext } from '@contexts/GlobalContext';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const { data, setCurrentScene } = useContext(globalContext);

  const navigate = useNavigate();
  const nextScene = () => navigate(`/scene/${scene.nextScene}`);

  const scene = data.scenes['00-splash-screen'];

  useEffect(() => {
    setCurrentScene('00-splash-screen');

    // simulate swipe / scroll down
    let touchstartY = 0;
    let touchendY = 0;

    const checkDirection = () => {
      if (touchstartY < touchendY) setTimeout(() => nextScene(), 600);
    };

    document.addEventListener('touchstart', (e) => {
      touchstartY = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', (e) => {
      touchendY = e.changedTouches[0].screenX;
      checkDirection();
    });
  }, []);

  return (
    <div className="splash-screen">
      <Menu />
      <SoundToggle />
      <Background type="video" src={scene.bg} />
      <Overlay />
      <Frame isLogo />
      <Subtitle content={scene.subtitle} />
      <Logo />
      <ScrollDown text={scene.cta} onClick={nextScene} />
    </div>
  );
};

export default SplashScreen;
