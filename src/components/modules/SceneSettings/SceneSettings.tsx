import './SceneSettings.scss';

import React, { Fragment, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Background from '@elements/Background/Background';
import Frame from '@elements/Frame/Frame';
import Logo from '@elements/Logo/Logo';
import Overlay from '@elements/Overlay/Overlay';
import Subtitle from '@elements/Subtitle/Subtitle';

import { globalContext } from '@contexts/GlobalContext';

const SceneSettings: React.FC = () => {
  const { setLang, data, setSound } = useContext(globalContext);

  const [settings, setSettings] = useState('lang');

  const handleSetLang = (lang: string) => {
    setLang(lang);
    setTimeout(() => {
      setSettings('sound');
    }, 1200);
  };

  const navigate = useNavigate();
  const handleSetSound = (soundState: string) => {
    setSound(soundState.includes('on'));
    setTimeout(() => {
      navigate('/splash-screen');
    }, 1200);
  };

  return (
    <div className="scene-settings">
      <Background type="video" src="/images/intro-video.mp4" />
      <Overlay />
      <Frame isLogo />
      <Fragment>
        <Subtitle content={data.scenes['00-splash-screen-settings-lang'].subtitle} />
        <div className="lang-buttons">
          {settings === 'lang' &&
            Object.entries(data.scenes['00-splash-screen-settings-lang'].cta).map((entry: [string, string]) => (
              <button
                className="unbutton"
                key={`btn-settings-lang-${entry[1]}`}
                onClick={() => handleSetLang(entry[0])}
              >
                {entry[1]}
              </button>
            ))}
          {settings === 'sound' &&
            Object.entries(data.scenes['00-splash-screen-settings-sound'].cta).map((entry: [string, string]) => (
              <button
                className="unbutton"
                key={`btn-settings-lang-${entry[1]}`}
                onClick={() => handleSetSound(entry[1])}
              >
                {entry[1]}
              </button>
            ))}
        </div>
      </Fragment>
      <Logo />
    </div>
  );
};

export default SceneSettings;
