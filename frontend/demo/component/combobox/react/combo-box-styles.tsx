import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { ComboBox } from '@vaadin/react-components';

function Example() {
  return (
    // tag::snippet[]
    <ComboBox
      theme="align-right small helper-above-field"
      label="Label"
      helperText="Helper text"
      items={['Value']}
      value="Value"
      style={{ '--vaadin-input-field-border-width': '1px' } as React.CSSProperties}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
