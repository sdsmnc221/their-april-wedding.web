import './Sounds.scss';

import React, { useContext, useEffect } from 'react';
import { globalContext } from '@contexts/GlobalContext';

const Sounds = () => {
  const { resources, sound, setSoundsNodes } = useContext(globalContext);

  useEffect(() => {
    if (resources && resources.sources.length) {
      setSoundsNodes([...document.querySelectorAll('audio')]);
    }
  }, [sound, resources]);

  return (
    <div className="sounds">
      {resources &&
        resources.sources.length &&
        resources.sources
          .filter((asset) => asset.type === 'audio')
          .map((sound) => (
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
