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

const SceneLoader = () => {
  const [progress, setProgress] = useState(0);
  const sceneRef = useRef(null);
  const { setResourcesIsReady } = useContext(globalContext);

  useEffect(() => {
    ResourcesLoader.loader.onProgress.add((loaderProgress) => setProgress(Math.ceil(loaderProgress.progress)));
  }, []);

  useEffect(() => {
    ResourcesLoader.loader.onComplete.add(() => {
      if (sceneRef.current)
        gsap.to([...sceneRef.current.children].reverse(), {
          opacity: 0,
          duration: 4.8,
          stagger: { each: 0.8 },
          ease: 'Power4.InOut',
          onComplete: () => setResourcesIsReady(true),
        });
    });
  }, [sceneRef.current]);

  return (
    <div className="scene-loader" ref={sceneRef}>
      <Background src={['bg-loader.jpeg']} animating={false} />
      <Overlay />
      <Frame />
      <Subtitle content={`${progress}  <strong>/  100.</strong>`} />
      <LogoLoader />
    </div>
  );
};

export default SceneLoader;
