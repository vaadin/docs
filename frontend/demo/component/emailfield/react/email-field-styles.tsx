import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { EmailField } from '@hilla/react-components/EmailField.js';

function Example() {
  return (
    // tag::snippet[]
    <EmailField
      theme="align-right small helper-above-field"
      label="Label"
      helperText="Helper text"
      value="foo@bar.com"
      style={{ '--vaadin-input-field-border-width': '1px' } as React.CSSProperties}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
