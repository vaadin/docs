import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { TextArea } from '@vaadin/react-components/TextArea.js';

function Example() {
  return (
    // tag::snippet[]
    <TextArea
      theme="align-right small helper-above-field"
      label="Label"
      helperText="Helper text"
      value="Value"
      style={{ width: '100%' }}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
