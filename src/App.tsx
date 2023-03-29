import React, { useState, useMemo, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import router from './routes';

import { globalContext, initialState } from './contexts/GlobalContext';

import dataFR from './data/fr.json';
import dataVN from './data/vn.json';

const App: React.FC = () => {
  const [lang, setLang] = useState(initialState.lang);
  const [data, setData] = useState(initialState.data);
  const [sound, setSound] = useState(initialState.sound);
  const [currentScene, setCurrentScene] = useState(initialState.currentScene);
  const value = useMemo(
    () => ({ lang, setLang, data, setData, sound, setSound, currentScene, setCurrentScene }),
    [lang, data]
  );

  useEffect(() => {
    if (lang === 'fr') setData(dataFR);
    else setData(dataVN);
  }, [lang]);

  return (
    <globalContext.Provider value={value}>
      <main className="app">
        <RouterProvider router={router} />
      </main>
    </globalContext.Provider>
  );
};

export default App;
