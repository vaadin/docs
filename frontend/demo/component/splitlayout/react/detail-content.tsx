import React from 'react';

type DetailContentProps = {
  style?: React.CSSProperties;
};

function DetailContent({ style }: DetailContentProps) {
  return (
    <div className="detail-content" style={style}>
      {[...Array(10)].map(() => (
        <div className="field">
          <label></label>
          <input type="text" />
        </div>
      ))}
    </div>
  );
}

export default DetailContent;
