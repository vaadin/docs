import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { TextField } from '@hilla/react-components/TextField.js';

function Example() {
  return (
    <HorizontalLayout theme="spacing">
      {/* tag::snippet[] */}
      <TextField minlength={5} maxlength={5} label="Zip code" style={{ width: '6em' }} />

      <TextField label="Username" helperText="Max 16 characters" minlength={1} maxlength={16} />
      {/* end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example);
