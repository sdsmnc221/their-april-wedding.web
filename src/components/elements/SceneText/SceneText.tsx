import './SceneText.scss';

import React, { Fragment, useEffect, useRef } from 'react';
import gsap from 'gsap-bonus';
import { SplitText } from 'gsap-bonus/SplitText';
import { useParams } from 'react-router-dom';

const createSplitText = (el, duration = 1.2, stagger = 0.1) => {
  const splitInstance = new SplitText(el, { type: 'chars,words', wordsClass: 'word', charsClass: 'char' });
  gsap.from(splitInstance.chars, {
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

interface Props {
  sceneId: string;
  text: string | string[];
  isHeading?: boolean;
}

interface PropsHeading {
  text: string;
}

interface PropsParagraphs {
  text: string[];
  sceneId: string;
}

const Heading: React.FC<PropsHeading> = ({ text }) => {
  return <h2 className="scene-text" dangerouslySetInnerHTML={{ __html: text }} />;
};

const Paragraphs: React.FC<PropsParagraphs> = ({ text, sceneId }) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) createSplitText(textRef.current, 0.6, 0.032);
  }, [sceneId]);

  return (
    <div className="scene-text" ref={textRef}>
      {text.map((p: string, i: number) => (
        <p key={`scene-text-${sceneId}-${i}`} dangerouslySetInnerHTML={{ __html: p }} />
      ))}
    </div>
  );
};

const SceneText: React.FC<Props> = ({ sceneId, text, isHeading }) => {
  return <Fragment>{isHeading ? <Heading text={text} /> : <Paragraphs text={text} sceneId={sceneId} />}</Fragment>;
};

export default SceneText;
