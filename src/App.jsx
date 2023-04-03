import React, { useState, useMemo, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import router from './routes';

import { globalContext, initialState } from '@contexts/GlobalContext';

import dataFR from './data/fr.json';
import dataVN from './data/vn.json';
import NoDesktop from './components/modules/NoDesktop/NoDesktop';
import NoLandscape from './components/modules/NoLandscape/NoLandscape';
import { getSound } from './utils';
import ResourcesLoader from './utils/ResourcesLoader';

const App = () => {
  const [userDidInteracted, setUserDidInteracted] = useState(initialState.userDidInteracted);
  const [lang, setLang] = useState(initialState.lang);
  const [data, setData] = useState(initialState.data);
  const [sound, setSound] = useState(initialState.sound);
  const [userDidSetSound, setUserDidSetSound] = useState(initialState.userDidSetSound);
  const [currentScene, setCurrentScene] = useState(initialState.currentScene);
  const [isMobile, setIsMobile] = useState(initialState.setIsMobile());
  const [isLandscape, setIsLandscape] = useState(initialState.setIsLandscape());
  const [menuOpened, setMenuOpened] = useState(initialState.menuOpened);
  const [creditsOpened, setCreditsOpened] = useState(initialState.creditsOpened);
  const [soundsNodes, setSoundsNodes] = useState(initialState.soundsNodes);
  const [resourcesIsReady, setResourcesIsReady] = useState(initialState.resourcesIsReady);

  const value = useMemo(
    () => ({
      userDidInteracted,
      setUserDidInteracted,
      lang,
      setLang,
      data,
      setData,
      sound,
      setSound,
      userDidSetSound,
      setUserDidSetSound,
      soundsNodes,
      setSoundsNodes,
      currentScene,
      setCurrentScene,
      isMobile,
      setIsMobile,
      isLandscape,
      setIsLandscape,
      menuOpened,
      setMenuOpened,
      creditsOpened,
      setCreditsOpened,
      resourcesIsReady,
      setResourcesIsReady,
    }),
    [
      userDidInteracted,
      lang,
      data,
      sound,
      userDidSetSound,
      soundsNodes,
      currentScene,
      isMobile,
      isLandscape,
      menuOpened,
      creditsOpened,
      resourcesIsReady,
    ]
  );

  useEffect(() => {
    if (lang === 'fr') setData(dataFR);
    else setData(dataVN);
  }, [lang]);

  useEffect(() => {
    // window.addEventListener('resourcesIsReady', () => {
    // });
    let amb1, amb2;
    if (resourcesIsReady && soundsNodes && userDidSetSound) {
      setTimeout(() => {
        if (sound) {
          amb1 = getSound(soundsNodes, 'ambiance');
          amb2 = getSound(soundsNodes, 'ambiance2');

          if (amb1 && amb1.paused) amb1.play();
          if (amb2 && amb2.paused) amb2.play();
        } else {
          soundsNodes.forEach((soundNode) => {
            soundNode.pause();
            // soundNode.currentTime = 0;
          });
          amb1?.pause();
          amb2?.pause();
        }
      }, 1000);
    }
  }, [sound, resourcesIsReady, soundsNodes, userDidSetSound]);

  useEffect(() => {
    const onResize = () => {
      setIsMobile(initialState.setIsMobile());
      setIsLandscape(initialState.setIsLandscape());
    };

    window.addEventListener('resize', onResize);

    ResourcesLoader.loader.onComplete.add(() => setTimeout(() => setResourcesIsReady(true), 1200));

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <globalContext.Provider value={value}>
      <main className="app" lang={lang}>
        {isMobile ? isLandscape ? <NoLandscape /> : <RouterProvider router={router} /> : <NoDesktop />}
      </main>
    </globalContext.Provider>
  );
};

export default App;
