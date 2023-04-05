import './Menu.scss';

import React, { useContext } from 'react';

import { globalContext } from '@contexts/GlobalContext';
import { animOut } from '../../../utils/animScene';

const Menu = ({ onClick }) => {
  const { menuOpened, setMenuOpened, creditsOpened, setCreditsOpened, sound } = useContext(globalContext);

  const handleClick = (e) => {
    e.stopPropagation();
    onClick && onClick();
    if (creditsOpened) animOut({ el: '.scene-credits', onComplete: () => setCreditsOpened(!creditsOpened) });
    else if (menuOpened) animOut({ el: '.scene-menu', onComplete: () => setMenuOpened(!menuOpened) });
    else setMenuOpened(!menuOpened);
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
