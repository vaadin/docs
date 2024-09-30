import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { RadioButton } from '@vaadin/react-components/RadioButton.js';
import { RadioGroup } from '@vaadin/react-components/RadioGroup.js';

function Example() {
  return (
    // tag::snippet[]
    <RadioGroup label="Repeat" theme="vertical" value="none">
      <RadioButton value="none" label="None" checked />
      <RadioButton value="daily" label="Daily" />
      <RadioButton value="weekly" label="Weekly" />
      <RadioButton value="monthly" label="Monthly" />
    </RadioGroup>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
