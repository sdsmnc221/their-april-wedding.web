import React from 'react';
import SceneSettings from './components/modules/SceneSettings/SceneSettings';

import data from './data/fr.json';

const App: React.FC = () => {
  return (
    <main className="app">
      <SceneSettings data={data} />
    </main>
  );
};

export default App;
