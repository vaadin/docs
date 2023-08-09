import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { ProgressBar } from '@hilla/react-components/ProgressBar.js';

function Example() {
  return (
    <VerticalLayout theme="spacing">
      {/* tag::snippet[] */}
      <ProgressBar value={0.5} theme="contrast" />
      <ProgressBar value={0.75} theme="success" />
      <ProgressBar value={0.2} theme="error" />
      {/* end::snippet[] */}
    </VerticalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
