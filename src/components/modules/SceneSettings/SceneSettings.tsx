import './SceneSettings.scss';

import Background from '@elements/Background/Background';
import Frame from '@elements/Frame/Frame';
import Logo from '@elements/Logo/Logo';
import Overlay from '@elements/Overlay/Overlay';
import Subtitle from '@elements/Subtitle/Subtitle';

import React, { Fragment } from 'react';

interface Props {
  data: { scenes: any };
}

const SceneSettings: React.FC<Props> = ({ data }) => {
  return (
    <div className="scene-settings">
      <Background type="video" src="/images/intro-video.mp4" />
      <Overlay />
      <Frame isLogo />
      <Subtitle content={data.scenes['00-splash-screen-settings'].subtitle} />
      <div className="lang-buttons">
        {Object.entries(data.scenes['00-splash-screen-settings'].cta).map((entry: [string, string]) => (
          <button className="unbutton" key={`settings-lang-btn-${entry[0]}`}>
            {entry[1]}
          </button>
        ))}
      </div>
      <Logo />
    </div>
  );
};

export default SceneSettings;
