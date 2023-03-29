import './SceneText.scss';

import React, { Fragment } from 'react';

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
  return (
    <div className="scene-text">
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
