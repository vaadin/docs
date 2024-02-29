import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Checkbox, CheckboxGroup } from '@vaadin/react-components';

function Example() {
  return (
    // tag::snippet[]
    <CheckboxGroup
      theme="helper-above-field"
      label="Label"
      helperText="Helper text"
      style={{ '--vaadin-input-field-border-width': '1px' } as React.CSSProperties}
    >
      <Checkbox value="1" label="Item 1" />
      <Checkbox value="2" label="Item 2" />
      <Checkbox value="3" label="Item 3" />
    </CheckboxGroup>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
