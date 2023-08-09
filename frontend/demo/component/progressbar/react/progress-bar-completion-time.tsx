import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { ProgressBar } from '@hilla/react-components/ProgressBar.js';

function Example() {
  return (
    // tag::snippet[]
    <div>
      <label className="text-secondary" id="pblbl">
        Generating report...
      </label>

      <ProgressBar indeterminate aria-labelledby="pblbl" aria-describedby="sublbl" />

      <span className="text-secondary text-xs" id="sublbl">
        Process can take upwards of 10 minutes
      </span>
    </div>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
