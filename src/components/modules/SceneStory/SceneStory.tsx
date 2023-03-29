import './SceneStory.scss';

import Background from '@elements/Background/Background';
import Frame from '@elements/Frame/Frame';
import Overlay from '@elements/Overlay/Overlay';
import Subtitle from '@elements/Subtitle/Subtitle';
import SceneText from '@elements/SceneText/SceneText';

import React, { useContext, useEffect, useState, Fragment } from 'react';
import { globalContext } from '@contexts/GlobalContext';
import { useNavigate, useParams } from 'react-router-dom';

const SceneStory: React.FC = () => {
  const { data, setCurrentScene } = useContext(globalContext);

  const { sceneId } = useParams();

  const [scene, setScene] = useState(data.scenes[sceneId]);
  const [subsceneId, setSubsceneId] = useState(0);
  const [subscenes, setSubscenes] = useState([]);

  useEffect(() => {
    setSubsceneId(0);
    setCurrentScene(sceneId);

    setScene(data.scenes[sceneId]);
  }, [sceneId]);

  useEffect(() => {
    if (sceneId !== '05-postface-wish' && sceneId !== '05-postface-last') {
      setSubscenes([
        { text: scene.title, bg: [...new Set(scene.bg)].filter((bg) => bg !== null), isHeading: true },
        ...scene.content.map((subscene: string[], index: number) => ({
          text: subscene,
          bg: [scene.bg[index]],
        })),
      ]);
    }
  }, [scene.nextScene]);

  const navigate = useNavigate();
  const handleSwitchScene = () => {
    if (subsceneId < subscenes.length - 1) setSubsceneId(subsceneId + 1);
    else if (scene.nextScene) navigate(`/scene/${scene.nextScene}`);
  };

  return (
    <div className="scene-story" onClick={handleSwitchScene}>
      {subscenes.length > 0 && (
        <Fragment>
          <Background
            sceneId={`${sceneId}-${subsceneId}`}
            type={scene.bg[0].includes('mp4') ? 'video' : 'image'}
            src={subscenes[subsceneId].bg}
            blur={subsceneId === 0}
          />
          <Overlay />
          <Frame />
          <Subtitle content={scene.subtitle} />
          <SceneText
            sceneId={`${sceneId}-${subsceneId}`}
            isHeading={subsceneId === 0}
            text={subscenes[subsceneId].text}
          />
        </Fragment>
      )}
    </div>
  );
};

export default SceneStory;
