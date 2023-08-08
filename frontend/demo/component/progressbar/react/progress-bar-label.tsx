import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { ProgressBar } from '@hilla/react-components/ProgressBar.js';

function Example() {
  return (
    // tag::snippet[]
    <div style={{ color: 'var(--lumo-secondary-text-color)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>Processing Financials.xlsx</div>
        <div>50%</div>
      </div>

      <ProgressBar value={0.5} />
    </div>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
