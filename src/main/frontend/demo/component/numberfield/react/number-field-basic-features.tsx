import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Icon } from '@vaadin/react-components/Icon.js';
import { NumberField } from '@vaadin/react-components/NumberField.js';
import { Tooltip } from '@vaadin/react-components/Tooltip.js';

function Example() {
  return (
    // tag::snippet[]
    <NumberField
      label="Label"
      helperText="Helper text"
      placeholder="Placeholder"
      clearButtonVisible
    >
      <Tooltip slot="tooltip" text="Tooltip text" />

      <div slot="prefix">$</div>

      <Icon slot="suffix" icon="vaadin:dollar" />
    </NumberField>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
