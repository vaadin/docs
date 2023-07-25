import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';

function Example() {
  return (
    <>
      <HorizontalLayout theme="spacing">
        {/* tag::snippet[] */}
        <Button theme="primary">Primary</Button>
        <Button theme="secondary">Secondary</Button>
        <Button theme="tertiary">Tertiary</Button>
        {/* end::snippet[] */}
      </HorizontalLayout>
    </>
  );
}

export default reactExample(Example); // hidden-source-line
