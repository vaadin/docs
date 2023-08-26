import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { RadioGroup } from '@hilla/react-components/RadioGroup.js';
import { Tooltip } from '@hilla/react-components/Tooltip.js';
import { RadioButton } from '@hilla/react-components/RadioButton.js';

function Example() {
  return (
    // tag::snippet[]
    <RadioGroup label="Label" helperText="Helper text">
      <Tooltip slot="tooltip" text="Tooltip text" />

      <RadioButton value="1" label="Item 1" />
      <RadioButton value="2" label="Item 2" />
      <RadioButton value="3" label="Item 3" />
    </RadioGroup>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
