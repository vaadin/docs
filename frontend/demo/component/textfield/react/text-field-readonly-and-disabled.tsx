import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { TextField } from '@hilla/react-components/TextField.js';

function Example() {
  return (
    <HorizontalLayout theme="spacing">
      {/* tag::snippet[] */}
      <TextField readonly label="Read-only" value="Value" />

      <TextField disabled label="Disabled" />
      {/* end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example);
