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
  const [lang, setLang] = useState(initialState.lang);
  const [data, setData] = useState(initialState.data);
  const [sound, setSound] = useState(initialState.sound);
  const [currentScene, setCurrentScene] = useState(initialState.currentScene);
  const [isMobile, setIsMobile] = useState(initialState.setIsMobile());
  const [isLandscape, setIsLandscape] = useState(initialState.setIsLandscape());
  const [menuOpened, setMenuOpened] = useState(false);
  const [resources, setResources] = useState(initialState.setResources());
  const value = useMemo(
    () => ({
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
      resources,
      setResources,
    }),
    [lang, data, sound, currentScene, isMobile, isLandscape, menuOpened, resources]
  );

  useEffect(() => {
    if (lang === 'fr') setData(dataFR);
    else setData(dataVN);
  }, [lang]);

  useEffect(() => {
    if (sound) fadeIn(Resources.getItem('ambiance').file);
  }, [sound]);

  useEffect(() => {
    const onResize = () => {
      setIsMobile(initialState.setIsMobile());
      setIsLandscape(initialState.setIsLandscape());
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('resourcesIsReady', () => console.log(Resources));

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <globalContext.Provider value={value}>
      <main className="app">
        {isMobile ? isLandscape ? <NoLandscape /> : <RouterProvider router={router} /> : <NoDesktop />}
      </main>
    </globalContext.Provider>
  );
};

export default App;
