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
      gsap.set(backgroundRef.current, {
        opacity: 0,
        yPercent: 48,
        scale: 0.48,
      });
    }
  }, []);

  useEffect(() => {
    if (backgroundRef.current) {
      gsap.to(backgroundRef.current, {
        opacity: 1,
        scale: 1,
        yPercent: 0,
        duration: 1.2,
        ease: 'Power4.easeOut',
      });
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
