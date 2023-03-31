import './Overlay.scss';

import React from 'react';

interface Props {
  withSunshine?: boolean;
  withSunshine2?: boolean;
  withStorm?: boolean;
  withLeaf?: boolean;
}

const Overlay: React.FC<Props> = ({
  withSunshine = false,
  withSunshine2 = false,
  withStorm = false,
  withLeaf = false,
}) => {
  return (
    <div className="overlay">
      {withSunshine && <img className="sunshine" src="/images/sunshine.gif" alt="" />}
      {withSunshine2 && <img className="sunshine2" src="/images/sunshine2.gif" alt="" />}
      {withStorm && <img className="storm" src="/images/storm.gif" alt="" />}
      {withLeaf && <img className="leaf" src="/images/leaf.gif" alt="" />}
    </div>
  );
};

export default Overlay;
