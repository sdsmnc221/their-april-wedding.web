import { createBrowserRouter } from 'react-router-dom';
import React, { Fragment, useContext } from 'react';

import SceneSettings from '@modules/SceneSettings/SceneSettings';
import SplashScreen from '@modules/SplashScreen/SplashScreen';
import SceneStory from '@modules/SceneStory/SceneStory';
import SceneMenu from '@modules/SceneMenu/SceneMenu';
import SceneCredits from '@modules/SceneCredits/SceneCredits';
import Scene404 from '@modules/Scene404/Scene404';
import SceneLoader from '@modules/SceneLoader/SceneLoader';

import { globalContext } from '../contexts/GlobalContext';
import Sounds from '../components/elements/Sounds/Sounds';

const Wrapper = ({ noNeedForInteraction, children }) => {
  const { menuOpened, creditsOpened, userDidInteracted, resourcesIsReady } = useContext(globalContext);
  return (
    <Fragment>
      {!resourcesIsReady ? (
        <SceneLoader />
      ) : noNeedForInteraction ? (
        <Fragment>{children}</Fragment>
      ) : userDidInteracted ? (
        <Fragment>
          {children}
          {menuOpened && <SceneMenu />}
          {creditsOpened && <SceneCredits />}
          <Sounds />
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
    element: (
      <Wrapper noNeedForInteraction>
        <SceneSettings />
      </Wrapper>
    ),
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
