import React, { useState, useMemo, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import router from './routes';

import { globalContext, initialState } from '@contexts/GlobalContext';

import dataFR from './data/fr.json';
import dataVN from './data/vn.json';
import NoDesktop from './components/modules/NoDesktop/NoDesktop';
import NoLandscape from './components/modules/NoLandscape/NoLandscape';
import Resources from './utils/Resources';
import { fadeIn, fadeOut } from './utils/howler';

const App = () => {
  const [userDidInteracted, setUserDidInteracted] = useState(initialState.userDidInteracted);
  const [lang, setLang] = useState(initialState.lang);
  const [data, setData] = useState(initialState.data);
  const [sound, setSound] = useState(initialState.sound);
  const [currentScene, setCurrentScene] = useState(initialState.currentScene);
  const [isMobile, setIsMobile] = useState(initialState.setIsMobile());
  const [isLandscape, setIsLandscape] = useState(initialState.setIsLandscape());
  const [menuOpened, setMenuOpened] = useState(initialState.menuOpened);
  const [creditsOpened, setCreditsOpened] = useState(initialState.creditsOpened);
  const [resources, setResources] = useState(initialState.resources);
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
      resources,
      setResources,
      resourcesIsReady,
      setResourcesIsReady,
    }),
    [userDidInteracted, lang, data, sound, currentScene, isMobile, isLandscape, menuOpened, creditsOpened]
  );

  useEffect(() => {
    if (lang === 'fr') setData(dataFR);
    else setData(dataVN);
  }, [lang]);

  useEffect(() => {
    // window.addEventListener('resourcesIsReady', () => {
    // });
    if (resources) {
      setTimeout(() => {
        if (sound) {
          fadeIn(Resources.getItem('ambiance').file, 800, 0.48);
          fadeIn(Resources.getItem('ambiance2').file, 800, 0.12);
        } else Resources.getAudios().forEach((audio) => fadeOut(audio.file));
      }, 1000);
    }
  }, [sound, resources]);

  useEffect(() => {
    const onResize = () => {
      setIsMobile(initialState.setIsMobile());
      setIsLandscape(initialState.setIsLandscape());
    };

    const onLoaded = () => {
      // if (!resourcesIsReady) setResourcesIsReady(true);
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('resourcesIsReady', onLoaded);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('resourcesIsReady', onLoaded);
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
