import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { TextField } from '@hilla/react-components/TextField.js';

function Example() {
  return (
    // tag::snippet[]
    <TextField
      theme="align-right small helper-above-field"
      label="Label"
      helperText="Helper text"
      value="Value"
      style={{ '--vaadin-input-field-border-width': '1px' } as React.CSSProperties}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
