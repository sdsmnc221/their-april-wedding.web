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

const Background = ({ sceneId, type, src, isRightBottom = true, blur = false }) => {
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

  return (
    <figure
      className={`background ${isRightBottom ? '--right-bottom' : '--left-top'} ${blur ? '--blurred' : ''}`}
      ref={backgroundRef}
      style={{ ['--img-count']: src.length }}
    >
      {src.map((source, index) => (
        <Fragment>
          {source.includes('mp4') ? (
            <video key={`${sceneId}-video-${index}`} src={`/images/${source}`} loop muted autoPlay />
          ) : (
            <img key={`${sceneId}-img-${index}`} src={`/images/${source}`} />
          )}
        </Fragment>
      ))}
    </figure>
  );
};

export default Background;
