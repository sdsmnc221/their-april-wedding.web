import './Menu.scss';

import React, { useContext } from 'react';

import { globalContext } from '@contexts/GlobalContext';

const Menu = () => {
  const { menuOpened, setMenuOpened, creditsOpened, setCreditsOpened } = useContext(globalContext);

  const handleClick = (e) => {
    e.stopPropagation();
    if (creditsOpened) setCreditsOpened(!creditsOpened);
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
