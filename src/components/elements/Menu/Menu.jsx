import './Menu.scss';

import React, { useContext } from 'react';

import { globalContext } from '@contexts/GlobalContext';

const Menu = ({ onClick }) => {
  const { menuOpened, setMenuOpened, creditsOpened, setCreditsOpened, sound } = useContext(globalContext);

  const handleClick = (e) => {
    e.stopPropagation();
    if (creditsOpened) setCreditsOpened(!creditsOpened);
    else setMenuOpened(!menuOpened);

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
