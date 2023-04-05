import './SceneMenu.scss';

import Background from '@elements/Background/Background';
import Frame from '@elements/Frame/Frame';
import Overlay from '@elements/Overlay/Overlay';

import React, { useContext, useEffect, useRef } from 'react';
import { globalContext } from '@contexts/GlobalContext';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap-bonus';
import { animOut } from '../../../utils/animScene';

const SceneMenu = () => {
  const { data, currentScene, menuOpened, setMenuOpened, setCreditsOpened } = useContext(globalContext);

  const navigate = useNavigate();

  const sceneRef = useRef(null);

  const toChapter = (e, chapter) => {
    e.preventDefault();
    navigate(chapter.includes('splash') ? '/splash-screen' : `/scene/${chapter}`);
    setTimeout(() => setMenuOpened(false), 600);
  };

  const handleCredits = (e) => {
    e.preventDefault();
    setCreditsOpened(true);
  };

  useEffect(() => {
    if (sceneRef.current) {
      const nodes = [...sceneRef.current.children, ...sceneRef.current.querySelectorAll('.chapters a')];
      if (menuOpened) {
        if (sceneRef.current) {
          gsap.fromTo(
            nodes,
            { opacity: 0, yPercent: 4 },
            {
              opacity: 1,
              yPercent: 0,
              duration: 2.4,
              delay: 0.6,
              stagger: { each: 0.4 },
              ease: 'Power4.InOut',
            }
          );
        }
      }
    }
  }, [menuOpened]);

  return (
    <div className="scene-menu" ref={sceneRef}>
      <Background animating={false} src={['intro-video.mp4']} isRightBottom={false} />
      <Overlay />
      <Frame withMenu />
      <div className="chapters">
        {Object.entries(data.scenes.menu.chapters).map(([key, chapterName]) => (
          <a
            key={`menu-chapter-${key}`}
            dangerouslySetInnerHTML={{ __html: chapterName }}
            className={`${
              key === currentScene || (key.includes('postface') && currentScene.includes('postface')) ? '--current' : ''
            }`}
            onClick={(e) => animOut({ sceneRef, onComplete: () => toChapter(e, key) })}
          />
        ))}
      </div>

      <button
        className={`unbutton ${currentScene === '05-postface-wish' ? '--current' : ''}`}
        type="submit"
        onClick={(e) => toChapter(e, '05-postface-wish')}
      >
        <img src="/images/logo.svg" alt="" />
        <span>{data.scenes.menu.cta}</span>
      </button>
      <a className="credits" onClick={handleCredits}>
        {data.scenes.credits.label}
      </a>
    </div>
  );
};

export default SceneMenu;
