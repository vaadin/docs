import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { ComboBox } from '@vaadin/react-components/ComboBox.js';

function Example() {
  return (
    // tag::snippet[]
    <ComboBox
      theme="helper-above-field"
      label="Label"
      helperText="Helper text"
      items={['Value']}
      value="Value"
      style={{ '--vaadin-input-field-border-width': '2px' } as React.CSSProperties}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
