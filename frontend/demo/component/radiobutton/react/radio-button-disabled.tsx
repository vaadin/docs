import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { RadioGroup } from '@hilla/react-components/RadioGroup.js';
import { RadioButton } from '@hilla/react-components/RadioButton.js';

function Example() {
  return (
    // tag::snippet[]
    <RadioGroup label="Status" disabled>
      <RadioButton value="inProgress" label="In progress" checked />
      <RadioButton value="done" label="Done" />
      <RadioButton value="cancelled" label="Cancelled" />
    </RadioGroup>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
