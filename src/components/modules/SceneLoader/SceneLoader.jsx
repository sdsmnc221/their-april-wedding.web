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
  const loaderRef = useRef(null);
  const { setResourcesIsReady } = useContext(globalContext);

  useEffect(() => {
    ResourcesLoader.loader.onProgress.add((loaderProgress) => setProgress(Math.ceil(loaderProgress.progress)));
  }, []);

  useEffect(() => {
    ResourcesLoader.loader.onComplete.add(() => {
      if (loaderRef.current)
        gsap.to([...loaderRef.current.children], {
          opacity: 0,
          duration: 2.4,
          stagger: { each: 0.6 },
          ease: 'Power4.InOut',
          onComplete: () => setResourcesIsReady(true),
        });
    });
  }, [loaderRef.current]);

  return (
    <div className="scene-loader" ref={loaderRef}>
      <Background src={['bg-loader.jpeg']} animating={false} />
      <Overlay />
      <Frame />
      <Subtitle content={`${progress}  <strong>/  100.</strong>`} />
      <LogoLoader />
    </div>
  );
};

export default SceneLoader;
