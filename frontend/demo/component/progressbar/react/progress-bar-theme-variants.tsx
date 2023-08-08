import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { ProgressBar } from '@hilla/react-components/ProgressBar.js';

function Example() {
  return (
    // tag::snippet[]
    <VerticalLayout theme="spacing" style={{ color: 'var(--lumo-secondary-text-color)' }}>
      <div style={{ width: '100%' }}>
        <div>Transferring files... (60/120)</div>
        <ProgressBar value={0.5} theme="contrast" />
      </div>

      <div style={{ width: '100%' }}>
        <div>Tasks (15/20)</div>
        <ProgressBar value={0.75} theme="success" />
      </div>

      <div style={{ width: '100%' }}>
        <div>Tasks (4/20)</div>
        <ProgressBar value={0.2} theme="error" />
      </div>
    </VerticalLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
