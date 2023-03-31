import './SceneMenu.scss';

import Background from '@elements/Background/Background';
import Frame from '@elements/Frame/Frame';
import Overlay from '@elements/Overlay/Overlay';

import React, { useContext } from 'react';
import { globalContext } from '@contexts/GlobalContext';
import { useNavigate } from 'react-router-dom';

const SceneMenu = () => {
  const { data, currentScene, setMenuOpened, setCreditsOpened } = useContext(globalContext);

  const navigate = useNavigate();

  const toChapter = (e, chapter) => {
    e.preventDefault();
    navigate(chapter.includes('splash') ? '/splash-screen' : `/scene/${chapter}`);
    setTimeout(() => setMenuOpened(false), 600);
  };

  const handleCredits = (e) => {
    e.preventDefault();
    setCreditsOpened(true);
  };

  return (
    <div className="scene-menu">
      <Background type="video" src={['intro-video.mp4']} isRightBottom={false} />
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
            onClick={(e) => toChapter(e, key)}
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
