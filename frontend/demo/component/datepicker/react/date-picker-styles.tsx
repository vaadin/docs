import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { DatePicker } from '@hilla/react-components/DatePicker.js';

function Example() {
  return (
    // tag::snippet[]
    <DatePicker
      theme="align-right small helper-above-field"
      label="Label"
      helperText="Helper text"
      value="2020-06-12"
      style={{ '--vaadin-input-field-border-width': '1px' } as React.CSSProperties}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
