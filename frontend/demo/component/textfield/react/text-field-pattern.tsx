import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { TextField } from '@hilla/react-components/TextField.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <TextField
        pattern="^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"
        label="Phone number"
        helperText="Format: +(123)456-7890"
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
