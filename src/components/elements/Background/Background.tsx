import './Background.scss';

import React from 'react';

interface Props {
  sceneId: string;
  type: string;
  src: string[];
  isRightBottom?: boolean;
  blur?: boolean;
}

const Background: React.FC<Props> = ({ sceneId, type, src, isRightBottom = true, blur = false }) => {
  switch (type) {
    case 'video':
      return (
        <figure className={`background ${isRightBottom ? '--right-bottom' : '--left-top'} ${blur ? '--blurred' : ''}`}>
          {src.map((video: string, index: number) => (
            <video key={`${sceneId}-video-${index}`} src={`/images/${video}`} loop muted autoPlay></video>
          ))}
        </figure>
      );

    case 'image':
      console.log(src);
      return (
        <figure
          className={`background ${isRightBottom ? '--right-bottom' : '--left-top'} ${blur ? '--blurred' : ''}`}
          style={{ ['--img-count' as string]: src.length }}
        >
          {src.map((img: string, index: number) => (
            <img key={`${sceneId}-img-${index}`} src={`/images/${img}`} />
          ))}
        </figure>
      );
      break;
    default:
      return <></>;
  }
};

export default Background;
