import './SceneStory.scss';

import Background from '@elements/Background/Background';
import Frame from '@elements/Frame/Frame';
import Overlay from '@elements/Overlay/Overlay';
import Subtitle from '@elements/Subtitle/Subtitle';
import SceneText from '@elements/SceneText/SceneText';
import Menu from '@elements/Menu/Menu';
import SoundToggle from '@elements/SoundToggle/SoundToggle';
import SceneWish from '../SceneWish/SceneWish';

import React, { useContext, useEffect, useState, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { globalContext } from '@contexts/GlobalContext';
import Resources from '../../../utils/Resources';
import { fadeIn, fadeOut } from '../../../utils/howler';

const SceneStory = () => {
  const { data, setCurrentScene, sound } = useContext(globalContext);

  const { sceneId } = useParams();

  const [scene, setScene] = useState(data.scenes[sceneId]);
  const [subsceneId, setSubsceneId] = useState(0);
  const [subscenes, setSubscenes] = useState([]);
  const [loadingScene, setLoadingScene] = useState(true);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    setSubsceneId(0);
    setCurrentScene(sceneId);

    setScene(data.scenes[sceneId]);

    setLoadingScene(true);

    if (sound) {
      const vo = Resources.getItem(`vo_${sceneId.slice(3)}_00`);
      if (vo) {
        setAudio(vo);
        fadeIn(vo.file);
      }
    }
  }, [sceneId, sound]);

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
    if (sound && subsceneId > 0) {
      const vo = Resources.getItem(`vo_${sceneId.slice(3)}_0${subsceneId}`);
      if (vo) {
        setAudio(vo);
        fadeIn(vo.file);
      }
    }
  }, [subsceneId, sound]);

  const navigate = useNavigate();
  const handleSwitchScene = () => {
    if (sceneId !== '05-postface-wish') {
      if (subsceneId < subscenes.length - 1) setSubsceneId(subsceneId + 1);
      else if (scene.nextScene) navigate(`/scene/${scene.nextScene}`);
      if (audio) fadeOut(audio.file);
    }
  };

  return (
    <div className={`scene-story --${sceneId}`} onClick={handleSwitchScene}>
      <Menu />
      <SoundToggle />
      {sceneId !== '05-postface-wish' && subscenes.length > 0 && (
        <Fragment>
          <Background
            sceneId={`${sceneId}-${subsceneId}`}
            type={subscenes[subsceneId].bg[0].includes('mp4') ? 'video' : 'image'}
            src={subscenes[subsceneId].bg}
            blur={subsceneId === 0}
          />
          <Overlay
            withSunshine={sceneId.includes('01') || sceneId.includes('05')}
            withStorm={sceneId.includes('02') && subsceneId < 2}
            withLeaf={sceneId.includes('03')}
            withSunshine2={sceneId.includes('04') || (sceneId.includes('02') && subsceneId >= 2)}
          />
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
