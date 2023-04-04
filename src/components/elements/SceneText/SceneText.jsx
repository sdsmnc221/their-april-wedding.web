import './SceneText.scss';

import React, { Fragment, useContext, useEffect, useRef } from 'react';
import gsap from 'gsap-bonus';
import { SplitText } from 'gsap-bonus/SplitText';
import { globalContext } from '@contexts/GlobalContext';

let timeoutRef;

const createSplitText = ({ el, duration = 1.2, stagger = 0.1 }) => {
  const splitInstance = new SplitText(el, { type: 'chars,words', wordsClass: 'word', charsClass: 'char' });
  return gsap
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
    });
};

const onComplete = ({ el, animateEndingCTA, animateBackgroundOut, toNext }) => {
  animateEndingCTA && animateEndingCTA();
  if (toNext) {
    animateBackgroundOut && animateBackgroundOut();

    timeoutRef = setTimeout(() => {
      console.log('from gsap');
      toNext();
    }, 2400);
  }

  if (el.tagName !== 'H2' && !animateEndingCTA)
    gsap.to(el, { opacity: 0, duration: 1.6, delay: 1, ease: 'Power4.InOut' });
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
  animateBackgroundOut,
  setOnVoiceEnded,
  sound,
}) => {
  const textRef = useRef(null);
  const { lang } = useContext(globalContext);
  let tl;

  useEffect(() => {
    const completeCb = () => {
      console.log('on complete sound off', sound);
      onComplete({
        el: textRef.current,
        animateEndingCTA: isLastText && animateEndingCTA,
        toNext,
        animateBackgroundOut,
      });
    };

    if (textRef.current) {
      gsap.killTweensOf(textRef.current);

      resetTimeout();

      tl = createSplitText({
        el: textRef.current,
        duration: 0.6,
        stagger: lang === 'vn' ? 0.072 : 0.056,
      });

      if (sound) {
        tl.eventCallback('onComplete', null);
        tl.eventCallback('onStart', () =>
          setOnVoiceEnded(() =>
            onComplete.bind(null, {
              el: textRef.current,
              animateEndingCTA: isLastText && animateEndingCTA,
              toNext,
              animateBackgroundOut,
            })
          )
        );
      } else {
        tl.eventCallback('onComplete', completeCb);
        tl.eventCallback('onStart', () => setOnVoiceEnded(null));
      }
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
  animateBackgroundOut,
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
          animateBackgroundOut={animateBackgroundOut}
          setOnVoiceEnded={setOnVoiceEnded}
          sound={sound}
        />
      )}
    </Fragment>
  );
};

export default SceneText;

export { onComplete };
