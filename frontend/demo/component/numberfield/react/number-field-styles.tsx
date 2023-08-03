import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { NumberField } from '@hilla/react-components/NumberField.js';

function Example() {
  return (
    // tag::snippet[]
    <NumberField
      theme="align-right small helper-above-field"
      label="Label"
      helperText="Helper text"
      value="123.45"
      style={
        {
          '--vaadin-input-field-border-width': '1px',
        } as React.CSSProperties
      }
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
