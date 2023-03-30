import './NoDesktop.scss';

import React, { useContext } from 'react';
import { globalContext } from '@contexts/GlobalContext';

function NoDesktop() {
  const { data } = useContext(globalContext);
  return (
    <div className="no-desktop">
      <p dangerouslySetInnerHTML={{ __html: data.noDesktop }} />
      <img src="/images/QR.svg" alt="QR" />
      <video muted autoPlay loop src="/images/waiting-video.mp4" />
    </div>
  );
}

export default NoDesktop;
