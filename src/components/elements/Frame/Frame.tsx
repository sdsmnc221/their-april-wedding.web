import './Frame.scss';

import React from 'react';

interface Props {
  isLogo?: boolean;
  withMenu?: boolean;
}

const Frame: React.FC<Props> = ({ isLogo = false, withMenu = false }) => {
  return (
    <div className={`frame ${isLogo ? '--logo' : ''} ${withMenu ? '--menu' : ''}`}>
      {isLogo ? <div className="frame__logo" /> : !withMenu ? <div className="frame__menu" /> : <></>}
    </div>
  );
};

export default Frame;
