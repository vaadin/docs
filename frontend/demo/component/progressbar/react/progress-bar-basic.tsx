import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { ProgressBar } from '@hilla/react-components/ProgressBar.js';

function Example() {
  return (
    // tag::snippet[]
    <ProgressBar value={0.5} />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
