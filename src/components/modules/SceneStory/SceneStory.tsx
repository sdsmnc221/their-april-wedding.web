import './SceneStory.scss';

import Background from '@elements/Background/Background';
import Frame from '@elements/Frame/Frame';
import Overlay from '@elements/Overlay/Overlay';
import Subtitle from '@elements/Subtitle/Subtitle';

import React, { useContext, useEffect } from 'react';
import { globalContext } from '@contexts/GlobalContext';
import { useParams } from 'react-router-dom';

const SceneStory: React.FC = () => {
  const { data, setCurrentScene } = useContext(globalContext);

  const { sceneId } = useParams();

  const scene = data.scenes[sceneId];

  console.log(sceneId);

  useEffect(() => {
    setCurrentScene(sceneId);
  }, []);

  return (
    <div className="scene-story">
      <Background type={scene.bg[0].includes('mp4') ? 'video' : 'image'} src={`/images/${scene.bg[0]}`} />
      <Overlay />
      <Frame />
      <Subtitle content={scene.subtitle} />
    </div>
  );
};

export default SceneStory;
