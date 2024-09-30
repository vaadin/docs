import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Checkbox } from '@vaadin/react-components/Checkbox.js';
import { CheckboxGroup } from '@vaadin/react-components/CheckboxGroup.js';
import { Tooltip } from '@vaadin/react-components/Tooltip.js';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';

function Example() {
  // tag::snippet[]
  return (
    <VerticalLayout theme="spacing">
      <Checkbox label="Label" helperText="Helper text" />

      <CheckboxGroup label="Label" helperText="Helper text">
        <Tooltip slot="tooltip" text="Tooltip text" />

        <Checkbox value="1" label="Item 1" />
        <Checkbox value="2" label="Item 2" />
        <Checkbox value="3" label="Item 3" />
      </CheckboxGroup>
    </VerticalLayout>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
