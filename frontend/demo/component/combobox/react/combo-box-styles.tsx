import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { ComboBox } from '@vaadin/react-components/ComboBox.js';

function Example() {
  return (
    // tag::snippet[]
    <ComboBox
      theme="align-right small helper-above-field"
      label="Label"
      helperText="Helper text"
      items={['Value']}
      value="Value"
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
