import React from 'react';

import dataFR from '../../data/fr.json';
import Loaders from '../../utils/Loaders';

// interface Props {
//   lang: string;
//   setLang: React.Dispatch<React.SetStateAction<string>> | (() => void);
//   data: any;
//   setData: React.Dispatch<React.SetStateAction<object>> | (() => void);
//   sound: boolean;
//   setSound: React.Dispatch<React.SetStateAction<boolean>> | (() => void);
//   currentScene: string;
//   setCurrentScene: React.Dispatch<React.SetStateAction<string>> | (() => void);
// }

const initialState = {
  lang: 'fr',
  setLang: () => undefined,
  data: dataFR,
  setData: () => undefined,
  sound: false,
  setSound: () => undefined,
  currentScene: '00-splash-screen',
  setCurrentScene: () => undefined,
  isMobile: false,
  setIsMobile: () => /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
  isLandscape: false,
  setIsLandscape: () => window.innerWidth > window.innerHeight,
  menuOpened: false,
  setMenuOpened: () => undefined,
  resources: null,
  setResources: () => new Loaders(),
  resourcesIsReady: false,
  setResourcesIsReady: () => undefined,
};

const globalContext = React.createContext(initialState);

export { globalContext, initialState };
