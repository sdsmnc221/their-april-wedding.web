import './Scene404.scss';

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Background from '@elements/Background/Background';
import Overlay from '@elements/Overlay/Overlay';

import { globalContext } from '@contexts/GlobalContext';

const Scene404 = () => {
  const { data } = useContext(globalContext);

  const navigate = useNavigate();

  return (
    <div className="scene-404">
      <Background src={['intro-video.mp4']} />
      <Overlay />
      <div className="not-found">
        <p dangerouslySetInnerHTML={{ __html: data['404'] }} />
      </div>
      <button className="unbutton" onClick={() => navigate('/')}>
        <img src="/images/pd-full.svg" alt="" />
      </button>
    </div>
  );
};

export default Scene404;
