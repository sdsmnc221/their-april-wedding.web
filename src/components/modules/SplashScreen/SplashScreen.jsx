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
import Resources from '../../../utils/Resources';
import { fadeIn } from '../../../utils/howler';

const SplashScreen = () => {
  const { data, setCurrentScene, sound, resources } = useContext(globalContext);

  const navigate = useNavigate();
  const nextScene = () => {
    navigate(`/scene/${scene.nextScene}`);
  };

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

  useEffect(() => {
    if (resources) {
      setTimeout(() => {
        if (sound) {
          // const amb1 = Resources.getItem('ambiance').file;
          // const amb2 = Resources.getItem('ambiance2').file;
          // if (!amb1.playing()) fadeIn(amb1, 800, 0.48);
          // if (!amb2.playing()) fadeIn(amb2, 800, 0.12);
        }
      }, 1000);
    }
  }, [sound, resources]);

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
