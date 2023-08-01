import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { SplitLayout } from '@hilla/react-components/SplitLayout.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <SplitLayout>
        <div style={{ width: '100%' }}>
          <div className="row">
            <div className="cell color">Cell 1</div>
            <div className="cell color">Cell 2</div>
            <div className="cell color">Cell 3</div>
            <div className="cell color">Cell 4</div>
          </div>
        </div>
        <div></div>
      </SplitLayout>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
