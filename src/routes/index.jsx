import { createBrowserRouter } from 'react-router-dom';
import React from 'react';

import SceneSettings from '@modules/SceneSettings/SceneSettings';
import SplashScreen from '@modules/SplashScreen/SplashScreen';
import SceneStory from '@modules/SceneStory/SceneStory';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SceneSettings />,
  },
  {
    path: '/splash-screen',
    element: <SplashScreen />,
  },
  {
    path: '/scene/:sceneId',
    element: <SceneStory />,
  },
]);

export default router;
