import React from 'react';

type MasterContentProps = {
  style?: React.CSSProperties;
};

function MasterContent({ style }: MasterContentProps) {
  return (
    <div className="master-content" style={style}>
      {[...Array(16)].map(() => (
        <div className="row">
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
        </div>
      ))}
    </div>
  );
}

export default MasterContent;
