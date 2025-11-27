import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { ProgressBar } from '@vaadin/react-components/ProgressBar.js';

function Example() {
  return (
    // tag::snippet[]
    <div>
      <label id="pblbl">Generating report...</label>

      <ProgressBar indeterminate aria-labelledby="pblbl" aria-describedby="sublbl" />

      <span id="sublbl" style={{ fontSize: '0.8125rem' }}>
        Process can take upwards of 10 minutes
      </span>
    </div>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
