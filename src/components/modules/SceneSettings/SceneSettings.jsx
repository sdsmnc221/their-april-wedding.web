import './SceneSettings.scss';

import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap-bonus';

import Background from '@elements/Background/Background';
import Frame from '@elements/Frame/Frame';
import Logo from '@elements/Logo/Logo';
import Overlay from '@elements/Overlay/Overlay';
import Subtitle from '@elements/Subtitle/Subtitle';

import { globalContext } from '@contexts/GlobalContext';

const SceneSettings = () => {
  const { setLang, data, setSound, setCurrentScene, setUserDidInteracted, setUserDidSetSound } =
    useContext(globalContext);

  const [settings, setSettings] = useState('lang');

  const sceneRef = useRef(null);

  const handleSetLang = (lang) => {
    setUserDidInteracted(true);
    setLang(lang);
    document.body.removeAttribute('class');
    document.body.classList.add(`--${lang}`);
    setTimeout(() => {
      setSettings('sound');
    }, 600);
  };

  const navigate = useNavigate();
  const handleSetSound = (soundState) => {
    setUserDidSetSound(true);
    setTimeout(() => {
      setSound(soundState.includes('on'));
    }, 1200);
    setTimeout(() => {
      navigate('/splash-screen');
    }, 600);
  };

  useEffect(() => {
    setCurrentScene('00-splash-screen');

    if (sceneRef.current) {
      gsap
        .timeline()
        .to(sceneRef.current, { opacity: 1, duration: 0.6 })
        .fromTo(
          [...sceneRef.current.children].reverse(),
          { opacity: 0, yPercent: 4 },
          {
            opacity: 1,
            yPercent: 0,
            duration: 2.4,
            delay: 0.8,
            stagger: { each: 0.4 },
            ease: 'Power4.InOut',
          }
        );
    }
  }, []);

  return (
    <div className="scene-settings" ref={sceneRef}>
      <Background animating={false} src={['intro-video.mp4']} />
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
