import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
export default reactExample(Example); // hidden-source-line
import React from 'react';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout';

function Example() {
  return (
    <>
      <HorizontalLayout theme="spacing">
        {/* tag::snippet[] */}
        <span {...{theme: 'badge'} as {}}>Pending</span>
        <span {...{theme: 'badge success'} as {}}>Confirmed</span>
        <span {...{theme: 'badge error'} as {}}>Denied</span>
        <span {...{theme: 'badge contrast'} as {}}>On hold</span>
        {/* end::snippet[] */}
      </HorizontalLayout>
    </>
  );
}
