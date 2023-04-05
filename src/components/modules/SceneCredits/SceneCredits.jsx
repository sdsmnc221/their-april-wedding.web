import './SceneCredits.scss';

import Background from '@elements/Background/Background';
import Frame from '@elements/Frame/Frame';
import Overlay from '@elements/Overlay/Overlay';

import React, { useContext, useEffect, useRef } from 'react';
import { globalContext } from '@contexts/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { animIn } from '../../../utils/animScene';
import { createSplitText } from '../../elements/SceneText/SceneText';

const SceneCredits = () => {
  const navigate = useNavigate();
  const { data, currentScene, setCreditsOpened, creditsOpened, menuOpened, setMenuOpened } = useContext(globalContext);

  const sceneRef = useRef(null);

  const toWish = (e) => {
    e.preventDefault();
    navigate('/scene/05-postface-wish');
    setTimeout(() => {
      setCreditsOpened(false);
      if (menuOpened) setMenuOpened(false);
    }, 600);
  };

  useEffect(() => {
    if (creditsOpened) {
      animIn({ sceneRef });
      createSplitText({ el: sceneRef.current.querySelector('.credits p'), duration: 0.8, stagger: 0.032 });
    }
  }, [creditsOpened]);

  return (
    <div className="scene-credits" ref={sceneRef}>
      <Background animating={false} src={['intro-video.mp4']} isRightBottom={false} />
      <Overlay />
      <Frame withMenu />
      <div className="credits">
        <p dangerouslySetInnerHTML={{ __html: data.scenes.credits.content }} />
      </div>
      <button
        className={`unbutton ${currentScene === '05-postface-wish' ? '--current' : ''}`}
        type="submit"
        onClick={toWish}
      >
        <img src="/images/logo.svg" alt="" />
        <span>{data.scenes.menu.cta}</span>
      </button>
    </div>
  );
};

export default SceneCredits;
