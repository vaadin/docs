import React from 'react';

type DetailContentProps = {
  style?: React.CSSProperties;
};

function DetailContent({ style }: DetailContentProps) {
  return (
    <div className="detail-content" style={style}>
      <div className="form">
        <div className="field">
          <label></label>
          <input type="text" />
        </div>
        <div className="field">
          <label></label>
          <input type="text" />
        </div>
        <div className="field">
          <label></label>
          <input type="text" />
        </div>
        <div className="field">
          <label></label>
          <input type="text" />
        </div>
        <div className="field">
          <label></label>
          <input type="text" />
        </div>
        <div className="field">
          <label></label>
          <input type="text" />
        </div>
        <div className="field">
          <label></label>
          <input type="text" />
        </div>
        <div className="field">
          <label></label>
          <input type="text" />
        </div>
        <div className="field">
          <label></label>
          <input type="text" />
        </div>
        <div className="field">
          <label></label>
          <input type="text" />
        </div>
      </div>
    </div>
  );
}

export default DetailContent;
