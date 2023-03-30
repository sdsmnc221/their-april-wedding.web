import React, { useState, useMemo, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import router from './routes';

import { globalContext, initialState } from '@contexts/GlobalContext';

import dataFR from './data/fr.json';
import dataVN from './data/vn.json';
import NoDesktop from './components/modules/NoDesktop/NoDesktop';

const App = () => {
  const [lang, setLang] = useState(initialState.lang);
  const [data, setData] = useState(initialState.data);
  const [sound, setSound] = useState(initialState.sound);
  const [currentScene, setCurrentScene] = useState(initialState.currentScene);
  const [isMobile, setIsMobile] = useState(initialState.setIsMobile());
  const value = useMemo(
    () => ({ lang, setLang, data, setData, sound, setSound, currentScene, setCurrentScene, isMobile, setIsMobile }),
    [lang, data]
  );

  useEffect(() => {
    if (lang === 'fr') setData(dataFR);
    else setData(dataVN);
  }, [lang]);

  useEffect(() => {
    const onResize = () => setIsMobile(initialState.setIsMobile());

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <globalContext.Provider value={value}>
      <main className="app">{isMobile ? <RouterProvider router={router} /> : <NoDesktop />}</main>
    </globalContext.Provider>
  );
};

export default App;
