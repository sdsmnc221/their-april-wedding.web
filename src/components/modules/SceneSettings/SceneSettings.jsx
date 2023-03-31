import './SceneSettings.scss';

import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Background from '@elements/Background/Background';
import Frame from '@elements/Frame/Frame';
import Logo from '@elements/Logo/Logo';
import Overlay from '@elements/Overlay/Overlay';
import Subtitle from '@elements/Subtitle/Subtitle';

import { globalContext } from '@contexts/GlobalContext';

const SceneSettings = () => {
  const { setLang, data, setSound, setCurrentScene } = useContext(globalContext);

  const [settings, setSettings] = useState('lang');

  const handleSetLang = (lang) => {
    setLang(lang);
    document.body.removeAttribute('class');
    document.body.classList.add(`--${lang}`);
    setTimeout(() => {
      setSettings('sound');
    }, 1200);
  };

  const navigate = useNavigate();
  const handleSetSound = (soundState) => {
    setSound(soundState.includes('on'));
    setTimeout(() => {
      navigate('/splash-screen');
    }, 600);
  };

  useEffect(() => {
    setCurrentScene('00-splash-screen');
  }, []);

  return (
    <div className="scene-settings">
      <Background type="video" src={['intro-video.mp4']} />
      <Overlay />
      <Frame isLogo />
      <Subtitle content={data.scenes['00-splash-screen-settings-lang'].subtitle} />
      <div className="lang-buttons">
        {settings === 'lang' &&
          Object.entries(data.scenes['00-splash-screen-settings-lang'].cta).map((entry) => (
            <button className="unbutton" key={`btn-settings-lang-${entry[1]}`} onClick={() => handleSetLang(entry[0])}>
              {entry[1]}
            </button>
          ))}
        {settings === 'sound' &&
          Object.entries(data.scenes['00-splash-screen-settings-sound'].cta).map((entry) => (
            <button className="unbutton" key={`btn-settings-lang-${entry[1]}`} onClick={() => handleSetSound(entry[0])}>
              {entry[1]}
            </button>
          ))}
      </div>

      <Logo />
    </div>
  );
};

export default SceneSettings;
