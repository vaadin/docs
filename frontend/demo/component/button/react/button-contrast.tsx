import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <HorizontalLayout theme="spacing" style={{ alignItems: 'baseline' }}>
        <Button theme="primary success">Primary</Button>
        <Button theme="secondary success">Secondary</Button>
        <Button theme="tertiary success">Tertiary</Button>
      </HorizontalLayout>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
