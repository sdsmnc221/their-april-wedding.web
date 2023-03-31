import './SceneWish.scss';

import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  labels: string[];
  cta: string;
  nextScene: string;
}

const SceneWish: React.FC<Props> = ({ labels, cta, nextScene }) => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/scene/${nextScene}`);
  };

  return (
    <form className="scene-wish" onSubmit={handleSubmit}>
      <div>
        {labels.map((label: string, index: number) => (
          <Fragment key={`input-wish-${index}`}>
            <p>{label}</p>
            <textarea name={`input-wish-${index}`} />
          </Fragment>
        ))}
      </div>
      <button className="unbutton" type="submit">
        <img src="/images/logo.svg" alt="" />
        <span>{cta}</span>
      </button>
    </form>
  );
};

export default SceneWish;
