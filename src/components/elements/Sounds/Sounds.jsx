import './Sounds.scss';

import React, { useContext, useEffect, useState } from 'react';
import { globalContext } from '@contexts/GlobalContext';
import ResourcesLoader from '../../../utils/ResourcesLoader';

const Sounds = () => {
  const { setSoundsNodes } = useContext(globalContext);
  const [audios, setAudios] = useState([]);

  useEffect(() => {
    setAudios(ResourcesLoader.getAudios());
  }, []);

  useEffect(() => {
    if (audios.length) {
      setSoundsNodes([...document.querySelectorAll('audio')]);
    }
  }, [audios]);

  return (
    <div className="sounds">
      {audios.length &&
        audios.map((sound) => (
          <audio
            key={`audio-${sound.name}`}
            className={`${sound.name}`}
            src={`/${sound.path}`}
            loop={sound.name.includes('ambiance')}
          ></audio>
        ))}
    </div>
  );
};

export default Sounds;
