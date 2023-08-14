import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { ProgressBar } from '@hilla/react-components/ProgressBar.js';

function Example() {
  return (
    // tag::snippet[]
    <div>
      <ProgressBar min={0} max={100} value={50} />
    </div>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
