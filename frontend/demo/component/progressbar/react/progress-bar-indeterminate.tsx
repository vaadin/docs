import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { ProgressBar } from '@hilla/react-components/ProgressBar.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <div style={{ color: 'var(--lumo-secondary-text-color)' }}>
        <div>Generating report...</div>
        <ProgressBar indeterminate />
      </div>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
