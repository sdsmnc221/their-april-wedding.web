import './Background.scss';

import React, { useRef, useEffect, Fragment } from 'react';
import gsap from 'gsap-bonus';

// interface Props {
//   sceneId: string;
//   type: string;
//   src: string[];
//   isRightBottom?: boolean;
//   blur?: boolean;
// }

const Background = ({ sceneId, src, isRightBottom = true, blur = false }) => {
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
  }, [src[0], src[1]]);

  return (
    <figure
      className={`background ${isRightBottom ? '--right-bottom' : '--left-top'} ${blur ? '--blurred' : ''}`}
      ref={backgroundRef}
      style={{ ['--img-count']: src.length }}
    >
      {src.map((source, index) => (
        <Fragment key={`${sceneId}-video-image-${index}`}>
          {source.includes('mp4') ? (
            <video src={`/images/${source}`} loop muted autoPlay playsInline />
          ) : (
            <img src={`/images/${source}`} />
          )}
        </Fragment>
      ))}
    </figure>
  );
};

export default Background;
