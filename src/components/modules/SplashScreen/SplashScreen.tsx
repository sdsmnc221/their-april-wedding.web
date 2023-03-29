import './SplashScreen.scss';

import Background from '@elements/Background/Background';
import Frame from '@elements/Frame/Frame';
import Logo from '@elements/Logo/Logo';
import Overlay from '@elements/Overlay/Overlay';
import Subtitle from '@elements/Subtitle/Subtitle';

import React, { Fragment, useContext } from 'react';
import { globalContext } from '@contexts/GlobalContext';

const SplashScreen: React.FC = () => {
  const { data } = useContext(globalContext);

  return (
    <div className="splash-screen">
      <Background type="video" src="/images/intro-video.mp4" />
      <Overlay />
      <Frame isLogo />
      <Fragment>
        <Subtitle content={data.scenes['00-splash-screen'].subtitle} />
      </Fragment>
      <Logo />
    </div>
  );
};

export default SplashScreen;
