import './SoundToggle.scss';

import React, { useContext } from 'react';
import { globalContext } from '@contexts/GlobalContext';

const SoundToggle = () => {
  const { sound, setSound, menuOpened } = useContext(globalContext);

  const handleSound = () => {
    setSound(!sound);
  };

  return (
    <div className={`sound-toggle ${menuOpened ? '--hidden' : ''}`} onClick={(e) => e.stopPropagation()}>
      <input id="switch" type="checkbox" checked={sound} onChange={handleSound} />
      <label className="love-heart" htmlFor="switch">
        <i className="left"></i>
        <i className="right"></i>
        <i className="bottom"></i>
        <div className="round"></div>
      </label>
      <img src="/images/voice.svg" alt="" />
    </div>
  );
};

export default SoundToggle;
