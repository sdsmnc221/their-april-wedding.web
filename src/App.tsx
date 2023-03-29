import React, { useState, useMemo, useEffect } from 'react';
import SceneSettings from './components/modules/SceneSettings/SceneSettings';

import { globalContext, initialState } from './contexts/GlobalContext';

import dataFR from './data/fr.json';
import dataVN from './data/vn.json';

const App: React.FC = () => {
  const [lang, setLang] = useState(initialState.lang);
  const [data, setData] = useState(initialState.data);
  const [sound, setSound] = useState(initialState.sound);
  const value = useMemo(() => ({ lang, setLang, data, setData, sound, setSound }), [lang, data]);

  useEffect(() => {
    if (lang === 'fr') setData(dataFR);
    else setData(dataVN);
  }, [lang]);

  return (
    <globalContext.Provider value={value}>
      <main className="app">
        <SceneSettings />
      </main>
    </globalContext.Provider>
  );
};

export default App;
