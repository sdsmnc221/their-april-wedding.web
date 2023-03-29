import './ScrollDown.scss';

import React from 'react';

interface Props {
  text: string;
  onClick: () => void;
}

const ScrollDown: React.FC<Props> = ({ text, onClick }) => {
  return (
    <div className="scroll-down" onClick={onClick}>
      <img src="/images/scroll-down.svg" alt="" />
      <span>{text}</span>
    </div>
  );
};

export default ScrollDown;
