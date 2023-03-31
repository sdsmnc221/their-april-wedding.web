import './SceneStory.scss';

import Background from '@elements/Background/Background';
import Frame from '@elements/Frame/Frame';
import Overlay from '@elements/Overlay/Overlay';
import Subtitle from '@elements/Subtitle/Subtitle';
import SceneText from '@elements/SceneText/SceneText';
import Menu from '@elements/Menu/Menu';
import SceneWish from '../SceneWish/SceneWish';

import React, { useContext, useEffect, useState, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { globalContext } from '@contexts/GlobalContext';
import Resources from '../../../utils/Resources';
import { fadeIn } from '../../../utils/howler';

const SceneStory = () => {
  const { data, setCurrentScene, sound } = useContext(globalContext);

  const { sceneId } = useParams();

  const [scene, setScene] = useState(data.scenes[sceneId]);
  const [subsceneId, setSubsceneId] = useState(0);
  const [subscenes, setSubscenes] = useState([]);
  const [loadingScene, setLoadingScene] = useState(true);

  useEffect(() => {
    setSubsceneId(0);
    setCurrentScene(sceneId);

    setScene(data.scenes[sceneId]);

    setLoadingScene(true);
  }, [sceneId]);

  useEffect(() => {
    if (sceneId !== '05-postface-wish') {
      setSubscenes([
        scene.title && { text: scene.title, bg: [...new Set(scene.bg)].filter((bg) => bg !== null), isHeading: true },
        ...scene.content.map((subscene, index) => ({
          text: subscene,
          bg: [scene.bg[index]],
        })),
      ]);

      setTimeout(() => setLoadingScene(false), 400);
    }
  }, [scene?.nextScene]);

  useEffect(() => {
    console.log(sceneId, subsceneId, `vo_${sceneId.slice(3)}_0${subsceneId}`);
    if (sound) {
      const audio = Resources.getItem(`vo_${sceneId.slice(3)}_0${subsceneId}`);
      if (audio) fadeIn(audio.file);
    }
  }, [subsceneId]);

  const navigate = useNavigate();
  const handleSwitchScene = () => {
    if (sceneId !== '05-postface-wish') {
      if (subsceneId < subscenes.length - 1) setSubsceneId(subsceneId + 1);
      else if (scene.nextScene) navigate(`/scene/${scene.nextScene}`);
    }
  };

  return (
    <div className={`scene-story --${sceneId}`} onClick={handleSwitchScene}>
      <Menu />
      {sceneId !== '05-postface-wish' && subscenes.length > 0 && (
        <Fragment>
          <Background
            sceneId={`${sceneId}-${subsceneId}`}
            type={subscenes[subsceneId].bg[0].includes('mp4') ? 'video' : 'image'}
            src={subscenes[subsceneId].bg}
            blur={subsceneId === 0}
          />
          <Overlay />
          <Frame hasMenu />
          <Subtitle content={scene.subtitle} />
          {!loadingScene && (
            <SceneText
              sceneId={`${sceneId}-${subsceneId}`}
              isHeading={subsceneId === 0}
              text={subscenes[subsceneId].text}
            />
          )}
        </Fragment>
      )}
      {sceneId === '05-postface-wish' && !!scene.labels && (
        <Fragment>
          <Background
            sceneId={`${sceneId}-${subsceneId}`}
            type={scene.bg[0].includes('mp4') ? 'video' : 'image'}
            src={scene.bg}
          />
          <Overlay />
          <Frame hasMenu />
          <Subtitle content={scene.subtitle} />
          <SceneWish labels={scene.labels} cta={scene.cta} nextScene={scene.nextScene} />
        </Fragment>
      )}
    </div>
  );
};

export default SceneStory;
