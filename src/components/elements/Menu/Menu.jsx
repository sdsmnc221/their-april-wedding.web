import './Menu.scss';

import React, { useContext } from 'react';

import { globalContext } from '@contexts/GlobalContext';
import Resources from '../../../utils/Resources';
import { fadeOut } from '../../../utils/howler';

const Menu = ({ onClick }) => {
  const { menuOpened, setMenuOpened, creditsOpened, setCreditsOpened, sound } = useContext(globalContext);

  const handleClick = (e) => {
    e.stopPropagation();
    if (creditsOpened) setCreditsOpened(!creditsOpened);
    else setMenuOpened(!menuOpened);

    if (sound) {
      Resources.getAudios().forEach((audio) => {
        if (!audio.name.includes('ambiance')) fadeOut(audio.file);
      });
    }

    onClick && onClick();
  };

  return (
    <div className={`menu ${menuOpened ? '--closed' : ''}`} onClick={handleClick}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Menu;
