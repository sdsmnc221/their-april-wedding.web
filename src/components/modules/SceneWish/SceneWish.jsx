import './SceneWish.scss';

import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// interface Props {
//   labels: string[];
//   cta: string;
//   nextScene: string;
// }

const SceneWish = ({ labels, errorLabel, cta, nextScene }) => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [editor, setEditor] = useState(null);
  const [error, setError] = useState(false);

  const handleChange = () => {
    if (editor) {
      const wish = editor.data.get();
      if (inputRef.current && wish) {
        setError(false);
      } else {
        setError(true);
      }
    }

    if (inputRef.current) {
      const identity = inputRef.current.value;
      if (editor && identity) {
        setError(false);
      } else {
        setError(true);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editor && inputRef.current) {
      const identity = inputRef.current.value;
      const wish = editor.data.get();
      if (identity && wish) {
        setError(false);
        navigate(`/scene/${nextScene}`);
      } else {
        setError(true);
      }
    }
  };

  return (
    <form className="scene-wish" onSubmit={handleSubmit}>
      <div>
        {labels.map((label, index) => (
          <Fragment key={`input-wish-${index}`}>
            <p>{label}</p>
            {index === 0 ? (
              <input name={`input-wish-${index}`} ref={inputRef} onChange={handleChange} />
            ) : (
              <CKEditor editor={ClassicEditor} onReady={(editor) => setEditor(editor)} onChange={handleChange} />
            )}
          </Fragment>
        ))}
      </div>
      {error && errorLabel && <p className="error">{errorLabel}</p>}
      <button className="unbutton" type="submit">
        <img src="/images/logo.svg" alt="" />
        <span>{cta}</span>
      </button>
    </form>
  );
};

export default SceneWish;
