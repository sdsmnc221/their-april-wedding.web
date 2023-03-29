import './Logo.scss';

import React from 'react';

import LogoImg from '/images/logo.png';

const Logo: React.FC = () => {
  return <img src={LogoImg} alt="Logo" className="logo" />;
};

export default Logo;
