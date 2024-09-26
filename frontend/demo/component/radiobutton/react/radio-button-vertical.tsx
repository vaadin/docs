import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { RadioButton } from '@vaadin/react-components/RadioButton.js';
import { RadioGroup } from '@vaadin/react-components/RadioGroup.js';

function Example() {
  return (
    // tag::snippet[]
    <RadioGroup label="Status" theme="vertical">
      <RadioButton value="pending" label="Pending" checked />
      <RadioButton value="submitted" label="Submitted" />
      <RadioButton value="confirmed" label="Confirmed" />
    </RadioGroup>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
