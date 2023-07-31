import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { ProgressBar } from '@hilla/react-components/ProgressBar.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <ProgressBar value={0.5} />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
