import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { RadioButton } from '@vaadin/react-components/RadioButton.js';
import { RadioGroup } from '@vaadin/react-components/RadioGroup.js';

function Example() {
  return (
    // tag::snippet[]
    <RadioGroup
      label="Label"
      helperText="Helper text"
      style={{ '--vaadin-input-field-border-width': '1px' } as React.CSSProperties}
      theme="helper-above-field"
    >
      <RadioButton value="1" label="Item 1" />
      <RadioButton value="2" label="Item 2" />
      <RadioButton value="3" label="Item 3" />
    </RadioGroup>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
