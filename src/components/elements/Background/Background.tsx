import './Background.scss';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap-bonus';

interface Props {
  sceneId: string;
  type: string;
  src: string[];
  isRightBottom?: boolean;
  blur?: boolean;
}

const Background: React.FC<Props> = ({ sceneId, type, src, isRightBottom = true, blur = false }) => {
  const backgroundRef = useRef(null);

  useEffect(() => {
    if (backgroundRef.current) {
      gsap.fromTo(
        backgroundRef.current,
        {
          opacity: 0,
          yPercent: 4,
        },
        {
          opacity: 1,
          yPercent: 0,
          duration: 3.2,
          ease: 'Power4.InOut',
        }
      );
    }
  }, [sceneId]);

  switch (type) {
    case 'video':
      return (
        <figure
          className={`background ${isRightBottom ? '--right-bottom' : '--left-top'} ${blur ? '--blurred' : ''}`}
          ref={backgroundRef}
        >
          {src.map((video: string, index: number) => (
            <video key={`${sceneId}-video-${index}`} src={`/images/${video}`} loop muted autoPlay></video>
          ))}
        </figure>
      );

    case 'image':
      return (
        <figure
          className={`background ${isRightBottom ? '--right-bottom' : '--left-top'} ${blur ? '--blurred' : ''}`}
          style={{ ['--img-count' as string]: src.length }}
          ref={backgroundRef}
        >
          {src.map((img: string, index: number) => (
            <img key={`${sceneId}-img-${index}`} src={`/images/${img}`} />
          ))}
        </figure>
      );
    default:
      return <></>;
  }
};

export default Background;
