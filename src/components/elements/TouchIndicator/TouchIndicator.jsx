import './TouchIndicator.scss';

import React, { useContext } from 'react';
import { globalContext } from '@contexts/GlobalContext';

const TouchIndicator = ({ touchIndicatorHidden, setTouchIndicatorHidden }) => {
  const { data } = useContext(globalContext);

  return (
    <div
      className={`touch-indicator ${touchIndicatorHidden ? '--hidden' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        setTouchIndicatorHidden(!touchIndicatorHidden);
      }}
    >
      <div className="loader-container">
        <div className="loader">
          <div className="loader-inner"></div>
          <div className="loader-inner"></div>
          <div className="loader-inner"></div>
          <div className="loader-inner"></div>
          <div className="loader-inner"></div>
          <div className="loader-inner"></div>
          <div className="loader-inner"></div>
          <div className="loader-inner"></div>
        </div>
      </div>
      <span>{data.touch}</span>
    </div>
  );
};

export default TouchIndicator;
