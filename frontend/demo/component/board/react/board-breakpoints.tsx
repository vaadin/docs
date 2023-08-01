import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <div style={{ display: 'flex', width: '100%' }}>
        <div style={{ flex: 'none', width: '100%' }}>
          <div style={{ display: 'flex' }}>
            <div className="cell">Cell 1</div>
            <div className="cell">Cell 2</div>
            <div className="cell">Cell 3</div>
            <div className="cell">Cell 4</div>
          </div>
        </div>
      </div>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
