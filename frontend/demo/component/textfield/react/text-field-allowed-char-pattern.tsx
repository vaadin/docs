import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { TextField } from '@hilla/react-components/TextField.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <TextField
        allowedCharPattern="[\\d\\-+()]"
        label="Phone number"
        helperText="Format: +(123)456-7890"
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
