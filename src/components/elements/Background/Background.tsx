import './Background.scss';

import React from 'react';

interface Props {
  type: string;
  src: string;
  isRightBottom?: boolean;
}

const Background: React.FC<Props> = ({ type, src, isRightBottom = true }) => {
  switch (type) {
    case 'video':
      return (
        <figure className={`background ${isRightBottom ? '--right-bottom' : '--left-top'}`}>
          <video src={src} loop muted autoPlay></video>
        </figure>
      );

    case 'image':
      return (
        <figure className={`background ${isRightBottom ? '--right-bottom' : '--left-top'}`}>
          <img src={src} />
        </figure>
      );
      break;
    default:
      return <></>;
  }
};

export default Background;
