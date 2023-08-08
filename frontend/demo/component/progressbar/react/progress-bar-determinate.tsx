import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { ProgressBar } from '@hilla/react-components/ProgressBar.js';

function Example() {
  return (
    // tag::snippet[]
    <div style={{ color: 'var(--lumo-secondary-text-color)' }}>
      <div>Processing Financials.xlsx (50%)</div>
      <ProgressBar value={0.5} />
    </div>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
