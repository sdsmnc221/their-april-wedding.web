import './Subtitle.scss';

import React from 'react';

interface Props {
  content: string;
}

const Subtitle: React.FC<Props> = ({ content }) => {
  return (
    <div className="subtitle">
      <p dangerouslySetInnerHTML={{ __html: content }}></p>
      <p dangerouslySetInnerHTML={{ __html: content }}></p>
    </div>
  );
};

export default Subtitle;
