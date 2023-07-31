import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';

function Example() {
  return (
    <>
      <HorizontalLayout theme="spacing">
        {/* tag::snippet[] */}
        <span {...{ theme: 'badge small' }}>Pending</span>
        <span {...{ theme: 'badge success small' }}>Confirmed</span>
        <span {...{ theme: 'badge error small' }}>Denied</span>
        <span {...{ theme: 'badge contrast small' }}>On hold</span>
        {/* end::snippet[] */}
      </HorizontalLayout>
    </>
  );
}

export default reactExample(Example); // hidden-source-line

