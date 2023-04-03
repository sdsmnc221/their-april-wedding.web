import './Background.scss';

import React, { useRef, useEffect, useState, Fragment } from 'react';
import gsap from 'gsap-bonus';

// interface Props {
//   sceneId: string;
//   type: string;
//   src: string[];
//   isRightBottom?: boolean;
//   blur?: boolean;
// }

const Background = ({ sceneId, src, isRightBottom = true, blur = false, animating = true, setBackgroundRef }) => {
  const backgroundRef = useRef(null);

  useEffect(() => {
    if (backgroundRef.current && animating) {
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

  useEffect(() => {
    if (backgroundRef.current) setBackgroundRef && setBackgroundRef(backgroundRef);
  }, [src, backgroundRef.current]);

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
