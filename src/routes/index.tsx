import { createBrowserRouter } from 'react-router-dom';

import SceneSettings from '@modules/SceneSettings/SceneSettings.tsx';
import SplashScreen from '@modules/SplashScreen/SplashScreen.tsx';
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
