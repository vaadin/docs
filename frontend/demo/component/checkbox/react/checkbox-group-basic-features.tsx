import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Checkbox } from '@hilla/react-components/Checkbox.js';
import { CheckboxGroup } from '@hilla/react-components/CheckboxGroup.js';
import { Tooltip } from '@hilla/react-components/Tooltip.js';

function Example() {
  // tag::snippet[]
  return (
    <CheckboxGroup label="Label" helperText="Helper text">
      <Tooltip slot="tooltip" text="Tooltip text" />

      <Checkbox value="1" label="Item 1" />
      <Checkbox value="2" label="Item 2" />
      <Checkbox value="3" label="Item 3" />
    </CheckboxGroup>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
