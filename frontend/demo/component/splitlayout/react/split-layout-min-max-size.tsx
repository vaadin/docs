import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { SplitLayout } from '@hilla/react-components/SplitLayout.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <SplitLayout style={{ maxHeight: '280px' }}>
        <div style={{ minWidth: '200px', maxWidth: '400px' }}></div>
        <div></div>
      </SplitLayout>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
