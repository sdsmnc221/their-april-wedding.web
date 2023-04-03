import './SceneLoader.scss';

import React, { useEffect, useState } from 'react';
import ResourcesLoader from '../../../utils/ResourcesLoader';

const SceneLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    ResourcesLoader.loader.onProgress.add((loaderProgress) => setProgress(Math.ceil(loaderProgress.progress)));
  }, []);
  return <div className="scene-loader">{progress} / 100</div>;
};

export default SceneLoader;
