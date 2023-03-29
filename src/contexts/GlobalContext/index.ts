import React from 'react';

import dataFR from '../../data/fr.json';

interface Props {
  lang: string;
  setLang: React.Dispatch<React.SetStateAction<string>> | (() => void);
  data: any;
  setData: React.Dispatch<React.SetStateAction<object>> | (() => void);
  sound: boolean;
  setSound: React.Dispatch<React.SetStateAction<boolean>> | (() => void);
}

const initialState = {
  lang: 'fr',
  setLang: () => undefined,
  data: dataFR,
  setData: () => undefined,
  sound: true,
  setSound: () => undefined,
};

const globalContext: React.Context<Props> = React.createContext(initialState);

export { globalContext, initialState };
