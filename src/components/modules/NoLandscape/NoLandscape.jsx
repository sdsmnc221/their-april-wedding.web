import './NoLandscape.scss';

import React, { useContext } from 'react';
import { globalContext } from '@contexts/GlobalContext';

function NoLandscape() {
  const { data } = useContext(globalContext);
  return (
    <div className="no-desktop">
      <p dangerouslySetInnerHTML={{ __html: data.noLandscape }} />
      <video muted autoPlay loop src="/images/waiting-video.mp4" />
    </div>
  );
}

export default NoLandscape;
