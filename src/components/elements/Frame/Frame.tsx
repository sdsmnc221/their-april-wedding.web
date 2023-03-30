import './Frame.scss';

import React from 'react';
import Menu from '../Menu/Menu';

interface Props {
  isLogo?: boolean;
  hasMenu?: boolean;
}

const Frame: React.FC<Props> = ({ isLogo = false, hasMenu = false }) => {
  return (
    <div className={`frame ${isLogo ? '--logo' : ''}`}>
      {isLogo ? <div className="frame__logo" /> : <div className="frame__menu" />}
      {hasMenu && <Menu />}
    </div>
  );
};

export default Frame;
