import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line

import React from 'react';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout';

function Example() {
  return (
    <>
      <HorizontalLayout theme="spacing">
        {/* tag::snippet[] */}
        {/* Since a native span element does not know about the theme attribute, as a workaround, you
        can use the spread operator to pass the theme attribute to the span element. */}
        <span {...({ theme: 'badge' } satisfies object)}>Pending</span>
        <span {...({ theme: 'badge success' } satisfies object)}>Confirmed</span>
        <span {...({ theme: 'badge error' } satisfies object)}>Denied</span>
        <span {...({ theme: 'badge contrast' } satisfies object)}>On hold</span>
        {/* end::snippet[] */}
      </HorizontalLayout>
    </>
  );
}

export default reactExample(Example); // hidden-source-line
