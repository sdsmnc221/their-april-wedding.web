import './Frame.scss';

import React from 'react';

interface Props {
  isLogo?: boolean;
}

const Frame: React.FC<Props> = ({ isLogo = false }) => {
  return <div className={`frame ${isLogo ? '--logo' : ''}`}>{isLogo && <div className="frame__logo" />}</div>;
};

export default Frame;
