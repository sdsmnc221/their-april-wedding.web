import './SceneLoader.scss';

import React, { useContext, useEffect, useRef, useState } from 'react';
import ResourcesLoader from '@utils/ResourcesLoader';
import { globalContext } from '@contexts/GlobalContext';
import gsap from 'gsap-bonus';

import Background from '@elements/Background/Background';
import Frame from '@elements/Frame/Frame';
import Overlay from '@elements/Overlay/Overlay';
import Subtitle from '@elements/Subtitle/Subtitle';
import LogoLoader from '@elements/LogoLoader/LogoLoader';
import { animOut } from '../../../utils/animScene';

const SceneLoader = () => {
  const [progress, setProgress] = useState(0);
  const sceneRef = useRef(null);
  const { setResourcesIsReady, resourcesIsReady } = useContext(globalContext);

  const animLoaderOut = animOut.bind(null, {
    sceneRef,
    onStart: () =>
      sceneRef.current &&
      [...sceneRef.current.querySelectorAll('svg *'), ...sceneRef.current.querySelectorAll('path')].forEach(
        (el) => (el.style.animationPlayState = 'paused')
      ),
    onComplete: () => setResourcesIsReady(true),
  });

  useEffect(() => {
    if (ResourcesLoader.loader.progress === 100) {
      setProgress(100);
      setResourcesIsReady(true);
    } else {
      ResourcesLoader.loader.onProgress.add((loaderProgress) => {
        const progress_ = Math.ceil(loaderProgress.progress);
        setProgress(progress_);

        setTimeout(() => {
          if (progress_ === 99) setTimeout(() => setProgress(100), 600);
        }, 2400);
      });
      //   ResourcesLoader.loader.onComplete.add(() => animLoaderOut());
    }
  }, [sceneRef.current]);

  //   useEffect(() => {
  //     if (resourcesIsReady) {
  //       setProgress(100);
  //         animLoaderOut();
  //     }
  //   }, [resourcesIsReady]);

  useEffect(() => {
    if (progress === 100) animLoaderOut();
  }, [progress]);

  return (
    <div
      className="scene-loader"
      ref={sceneRef}
      style={{ ['--progress']: `${progress}%`, ['--progress-decimal']: `${progress * 0.1}` }}
    >
      <Background src={['bg-loader.jpeg']} animating={false} />
      <Overlay />
      <Frame />
      <Subtitle content={`${progress}  <strong>/  100.</strong>`} />
      <LogoLoader />
    </div>
  );
};

export default SceneLoader;
