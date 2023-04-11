import './SceneStory.scss';

import Background from '@elements/Background/Background';
import Frame from '@elements/Frame/Frame';
import Overlay from '@elements/Overlay/Overlay';
import Subtitle from '@elements/Subtitle/Subtitle';
import SceneText from '@elements/SceneText/SceneText';
import Menu from '@elements/Menu/Menu';
import SoundToggle from '@elements/SoundToggle/SoundToggle';
import TouchIndicator from '@elements/TouchIndicator/TouchIndicator';
import SceneWish from '../SceneWish/SceneWish';

import React, { useContext, useEffect, useState, Fragment, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import gsap from 'gsap-bonus';

import { globalContext } from '@contexts/GlobalContext';
import { getSound } from '../../../utils';
import { animIn } from '../../../utils/animScene';

const SceneStory = () => {
  const {
    data,
    setCurrentScene,
    lang,
    sound,
    soundsNodes,
    setCreditsOpened,
    creditsOpenened,
    menuOpened,
    setMenuOpened,
  } = useContext(globalContext);

  const { sceneId } = useParams();

  const endingCTAsRef = useRef(null);
  const sceneRef = useRef(null);

  const [touchIndicatorHidden, setTouchIndicatorHidden] = useState(true);
  const [scene, setScene] = useState(data.scenes[sceneId]);
  const [subsceneId, setSubsceneId] = useState(0);
  const [subscenes, setSubscenes] = useState([]);
  const [loadingScene, setLoadingScene] = useState(true);
  // const [automating, setAutomating] = useState(true);
  const [backgroundRef, setBackgroundRef] = useState(null);
  const [onVoiceEnded, setOnVoiceEnded] = useState(null);

  const animateEndingCTA = useCallback(() => {
    if (endingCTAsRef.current) {
      const nodes = [...endingCTAsRef.current.querySelectorAll('a')];
      gsap.from(nodes, {
        filter: 'blur(32px)',
        opacity: 0,
        y: 64,
        duration: 2.4,
        delay: 0.6,
        ease: 'Power4.InOut',
        stagger: {
          each: 0.64,
        },
        onStart: () => {
          gsap.to(endingCTAsRef.current, { opacity: 1, duration: 4.8, ease: 'Power4.InOut' });
        },
      });
    }
  }, [endingCTAsRef.current, subsceneId]);

  const animateBackground = (out = true) => {
    if (backgroundRef && backgroundRef.current) {
      gsap.to(backgroundRef.current, { opacity: out ? 0 : 1, duration: 1.6, delay: 1, ease: 'Power4.InOut' });
    }
  };

  const navigate = useNavigate();

  const handleSwitchScene = () => {
    if (sceneId !== '05-postface-wish') {
      // setAutomating(false);

      if (subsceneId < subscenes.length - 1) setSubsceneId(subsceneId + 1);
      else if (scene.nextScene) {
        setSubsceneId(0);
        navigate(`/scene/${scene.nextScene}`);
      }

      // setAutomating(true);
    }
  };

  const toNext = () => {
    // if (automating) {
    if (sceneId !== '05-postface-wish') {
      if (subsceneId < subscenes.length - 1) setSubsceneId(subsceneId + 1);
      else if (scene.nextScene && subsceneId === subscenes.length - 1) {
        setSubsceneId(0);
        navigate(`/scene/${scene.nextScene}`);
      }

      if (sound) {
        soundsNodes.forEach((soundNode) => {
          if (
            !soundNode.classList.contains('ambiance') &&
            !soundNode.classList.contains('ambiance2') &&
            !soundNode.classList.contains(
              `vo_${sceneId.slice(3)}_0${subsceneId}${subsceneId !== 0 && lang === 'vn' ? '_vn' : ''}`
            )
          ) {
            soundNode.pause();
          }
        });
      }
    }
    // }
    console.log('next scene', { sceneId, subsceneId });
  };

  const toScene = (e, index) => {
    e.preventDefault();
    if (index === 0) {
      setMenuOpened(true);
      setCreditsOpened(true);
    } else navigate('/');
  };

  useEffect(() => {
    setTimeout(() => {
      animIn({ sceneRef });
    }, 200);
  }, [sceneRef.current, sceneId]);

  useEffect(() => {
    setCurrentScene(sceneId);

    setScene(data.scenes[sceneId]);

    setSubsceneId(0);

    setLoadingScene(true);

    setTimeout(() => setTouchIndicatorHidden(false), 3200);
  }, [sceneId]);

  useEffect(() => {
    if (sound && soundsNodes && subsceneId === 0) {
      setTimeout(() => {
        // const vo = Resources.getItem(`vo_${sceneId.slice(3)}_00`);
        const vo = getSound(soundsNodes, `vo_${sceneId.slice(3)}_00`);
        if (vo) {
          vo.play();
        }
      }, 1000);
    }
  }, [sceneId, subsceneId, sound, soundsNodes]);

  useEffect(() => {
    if (sceneId !== '05-postface-wish') {
      console.log(scene);
      setSubscenes([
        scene.title && { text: scene.title, bg: [...new Set(scene.bg)].filter((bg) => bg !== null), isHeading: true },
        ...scene.content.map((subscene, index) => ({
          text: subscene,
          bg: [scene.bg[index]],
        })),
      ]);

      setTimeout(() => setLoadingScene(false), 1000);
    }
  }, [scene?.nextScene]);

  useEffect(() => {
    if (sound && soundsNodes && subsceneId > 0) {
      setTimeout(() => {
        const vo = getSound(
          soundsNodes,
          `vo_${sceneId.slice(3)}_0${subsceneId}${subsceneId !== 0 && lang === 'vn' ? '_vn' : ''}`
        );
        if (vo) {
          if (sound) vo.onended = () => onVoiceEnded && onVoiceEnded() && console.log('voice ended');
          vo.play();
        }
      }, 1000);
    }
  }, [subsceneId, sound, soundsNodes, onVoiceEnded]);

  return (
    // <div className={`scene-story --${sceneId}`} onClick={handleSwitchScene}>
    <div className={`scene-story --${sceneId}`} ref={sceneRef}>
      <Menu
        onClick={() => {
          setSubsceneId(0);
          // setAutomating(!automating);
        }}
      />
      <SoundToggle />
      {sceneId !== '05-postface-wish' && !menuOpened && !creditsOpenened && (
        <TouchIndicator
          touchIndicatorHidden={touchIndicatorHidden}
          setTouchIndicatorHidden={setTouchIndicatorHidden}
          onClick={() => {
            console.log('from touch indicator');
            toNext();
          }}
        />
      )}
      {sceneId !== '05-postface-wish' && subscenes.length > 0 && (
        <Fragment>
          <Background
            sceneId={`${sceneId}-${subsceneId}`}
            src={subscenes && subscenes[subsceneId] && subscenes[subsceneId].bg}
            blur={subsceneId === 0}
            setBackgroundRef={setBackgroundRef}
            animating={subsceneId !== 0}
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
              text={subscenes[subsceneId]?.text || []}
              isLastText={subsceneId === subscenes.length - 1}
              animateEndingCTA={animateEndingCTA}
              toNext={toNext}
              animateBackground={animateBackground}
              setOnVoiceEnded={setOnVoiceEnded}
              sound={sound}
            />
          )}
          {sceneId === '05-postface-last' && subsceneId === subscenes.length - 1 && (
            <div className="ending-cta" ref={endingCTAsRef}>
              {scene &&
                Array.isArray(scene.cta) &&
                scene.cta.map((cta, index) => (
                  <a key={`ending-cta-${index}`} onClick={(e) => toScene(e, index)}>
                    {cta}
                  </a>
                ))}
            </div>
          )}
        </Fragment>
      )}
      {sceneId === '05-postface-wish' && !!scene.labels && (
        <Fragment>
          <Background
            animating={false}
            sceneId={`${sceneId}-${subsceneId}`}
            src={scene.bg}
            setBackgroundRef={setBackgroundRef}
          />
          <Overlay />
          <Frame hasMenu />
          <Subtitle content={scene.subtitle} />
          <SceneWish
            labels={scene.labels}
            cta={scene.cta}
            errorLabel={scene.errorLabel}
            skipLabel={scene.skipLabel}
            nextScene={scene.nextScene}
            setTouchIndicatorHidden={setTouchIndicatorHidden}
          />
        </Fragment>
      )}
    </div>
  );
};

export default SceneStory;
