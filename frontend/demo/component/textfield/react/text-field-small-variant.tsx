import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { TextField } from '@hilla/react-components/TextField.js';

function Example() {
  return (
    <HorizontalLayout theme="spacing">
      <TextField label="Default size" value="Value" />

      {/* tag::snippet[] */}
      <TextField theme="small" label="Small size" value="Value" />
      {/* end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
