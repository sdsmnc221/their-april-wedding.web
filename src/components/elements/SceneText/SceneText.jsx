import './SceneText.scss';

import React, { Fragment, useEffect, useRef } from 'react';
import gsap from 'gsap-bonus';
import { SplitText } from 'gsap-bonus/SplitText';

const createSplitText = (el, duration = 1.2, stagger = 0.1, animateEndingCTA, toNextSubscene, toNextScene) => {
  const splitInstance = new SplitText(el, { type: 'chars,words', wordsClass: 'word', charsClass: 'char' });
  gsap
    .timeline()
    .to(el, { opacity: 1, duration: 0.6, ease: 'Power4.InOut' })
    .from(splitInstance.chars, {
      filter: 'blur(3.2px)',
      y: 32,
      opacity: 0,
      duration,
      stagger: {
        each: stagger,
      },
      ease: 'Power4.InOut',
      onComplete: () => {
        animateEndingCTA && animateEndingCTA();
        setTimeout(() => {
          if (toNextScene) toNextScene();
          else toNextSubscene && toNextSubscene();
        }, 1600);
      },
    });
};

// interface Props {
//   sceneId: string;
//   text: string;
//   isHeading?: boolean;
// }

// interface PropsHeading {
//   text: string;
// }

// interface PropsParagraphs {
//   text: string;
//   sceneId: string;
// }

const Heading = ({ text }) => {
  const textRef = useRef(null);
  useEffect(() => {
    if (textRef.current) createSplitText(textRef.current, 3.2, 0);
  }, []);
  return <h2 className="scene-text" dangerouslySetInnerHTML={{ __html: text }} ref={textRef} />;
};

const Paragraphs = ({ text, sceneId, animateEndingCTA, isLastText, toNextScene, toNextSubscene }) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current)
      createSplitText(
        textRef.current,
        0.6,
        0.056,
        isLastText && animateEndingCTA,
        toNextSubscene,
        isLastText && toNextScene
      );
  }, [sceneId]);

  return (
    <div className="scene-text" ref={textRef}>
      {text.map((p, i) => (
        <p key={`scene-text-${sceneId}-${i}`} dangerouslySetInnerHTML={{ __html: p }} />
      ))}
    </div>
  );
};

const SceneText = ({ sceneId, text, isHeading, isLastText, animateEndingCTA, toNextScene, toNextSubscene }) => {
  return (
    <Fragment>
      {isHeading ? (
        <Heading text={text} />
      ) : (
        <Paragraphs
          text={text}
          sceneId={sceneId}
          isLastText={isLastText}
          animateEndingCTA={animateEndingCTA}
          toNextScene={toNextScene}
          toNextSubscene={toNextSubscene}
        />
      )}
    </Fragment>
  );
};

export default SceneText;
