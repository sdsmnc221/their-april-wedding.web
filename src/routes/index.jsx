import { createBrowserRouter } from 'react-router-dom';
import React, { Fragment, useContext } from 'react';

import SceneSettings from '@modules/SceneSettings/SceneSettings';
import SplashScreen from '@modules/SplashScreen/SplashScreen';
import SceneStory from '@modules/SceneStory/SceneStory';
import SceneMenu from '@modules/SceneMenu/SceneMenu';
import SceneCredits from '@modules/SceneCredits/SceneCredits';
import Scene404 from '@modules/Scene404/Scene404';

import { globalContext } from '../contexts/GlobalContext';

const Wrapper = ({ children }) => {
  const { menuOpened, creditsOpened, userDidInteracted } = useContext(globalContext);
  return (
    <Fragment>
      {userDidInteracted ? (
        <Fragment>
          {children}
          {menuOpened && <SceneMenu />}
          {creditsOpened && <SceneCredits />}
        </Fragment>
      ) : (
        <Scene404 />
      )}
    </Fragment>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <SceneSettings />,
  },
  {
    path: '/splash-screen',
    element: (
      <Wrapper>
        <SplashScreen />
      </Wrapper>
    ),
  },
  {
    path: '/scene/:sceneId',
    element: (
      <Wrapper>
        <SceneStory />
      </Wrapper>
    ),
  },
  {
    path: '/*',
    element: <Scene404 />,
  },
  {
    path: '*',
    element: <Scene404 />,
  },
]);

export default router;
