import './SceneText.scss';

import React, { Fragment, useContext, useEffect, useRef } from 'react';
import gsap from 'gsap-bonus';
import { SplitText } from 'gsap-bonus/SplitText';
import { globalContext } from '@contexts/GlobalContext';

let timeoutRef;

const createSplitText = ({ el, duration = 1.2, stagger = 0.1, completeCb, startCb }) => {
  const splitInstance = new SplitText(el, { type: 'chars,words', wordsClass: 'word', charsClass: 'char' });
  return gsap
    .timeline({ onComplete: completeCb, onStart: startCb })
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
    });
};

const onComplete = ({ el, animateEndingCTA, animateBackground, toNext }) => {
  animateEndingCTA && animateEndingCTA();

  if (toNext) {
    !animateEndingCTA && animateBackground(true);

    timeoutRef = setTimeout(() => {
      console.log('from gsap');
      toNext();
    }, 1200);
  }

  if (el.tagName !== 'H2' && !animateEndingCTA)
    gsap.to(el, { opacity: 0, duration: 1, delay: 0.4, ease: 'Power4.InOut' });
};

const resetTimeout = () => {
  if (timeoutRef) {
    clearTimeout(timeoutRef);
    timeoutRef = null;
  }
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
    if (textRef.current) createSplitText({ el: textRef.current, duration: 3.2, stagger: 0 });
  }, []);
  return <h2 className="scene-text" dangerouslySetInnerHTML={{ __html: text }} ref={textRef} />;
};

const Paragraphs = ({
  text,
  sceneId,
  animateEndingCTA,
  isLastText,
  toNext,
  animateBackground,
  setOnVoiceEnded,
  sound,
}) => {
  const textRef = useRef(null);
  const { lang } = useContext(globalContext);
  let tl;

  useEffect(() => {
    const completeCb = () => {
      onComplete({
        el: textRef.current,
        animateEndingCTA: isLastText && animateEndingCTA,
        toNext,
        animateBackground,
      });
    };

    const startCb = () =>
      setOnVoiceEnded(() =>
        onComplete.bind(null, {
          el: textRef.current,
          animateEndingCTA: isLastText && animateEndingCTA,
          toNext,
          animateBackground,
        })
      );

    const stopAnim = () => {
      // gsap.killTweensOf(textRef.current);
      resetTimeout();
    };

    if (textRef.current) {
      stopAnim();
      tl = createSplitText({
        el: textRef.current,
        duration: 0.6,
        stagger: lang === 'vn' ? 0.072 : 0.056,
        ...(sound ? { completeCb: null, startCb } : { completeCb, startCb: null }),
      });
    }
  }, [text, sound]);

  return (
    <div className="scene-text" ref={textRef}>
      {text.map((p, i) => (
        <p key={`scene-text-${sceneId}-${i}`} dangerouslySetInnerHTML={{ __html: p }} />
      ))}
    </div>
  );
};

const SceneText = ({
  sceneId,
  text,
  isHeading,
  isLastText,
  animateEndingCTA,
  toNext,
  animateBackground,
  setOnVoiceEnded,
  sound,
}) => {
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
          toNext={toNext}
          animateBackground={animateBackground}
          setOnVoiceEnded={setOnVoiceEnded}
          sound={sound}
        />
      )}
    </Fragment>
  );
};

export default SceneText;

export { onComplete, createSplitText };
