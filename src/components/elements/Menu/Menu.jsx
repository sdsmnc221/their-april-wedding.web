import './Menu.scss';

import React, { useContext } from 'react';

import { globalContext } from '@contexts/GlobalContext';

const Menu = () => {
  const { menuOpened, setMenuOpened } = useContext(globalContext);

  const handleClick = (e) => {
    e.stopPropagation();
    setMenuOpened(!menuOpened);
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
