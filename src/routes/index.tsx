import { createBrowserRouter } from 'react-router-dom';

import SceneSettings from '@modules/SceneSettings/SceneSettings.tsx';
import SplashScreen from '@modules/SplashScreen/SplashScreen.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SceneSettings />,
  },
  {
    path: '/splash-screen',
    element: <SplashScreen />,
  },
]);

export default router;
