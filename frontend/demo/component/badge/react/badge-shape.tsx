import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';

function Example() {
  return (
    <HorizontalLayout theme="spacing">
      {/* tag::snippet[] */}
      <span {...{ theme: 'badge pill' }}>Pending</span>
      <span {...{ theme: 'badge success pill' }}>Confirmed</span>
      <span {...{ theme: 'badge error pill' }}>Denied</span>
      <span {...{ theme: 'badge contrast pill' }}>On hold</span>
      {/* end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
