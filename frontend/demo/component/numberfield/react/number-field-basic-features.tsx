import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { NumberField } from '@hilla/react-components/NumberField.js';
import { Tooltip } from '@hilla/react-components/Tooltip.js';
import { Icon } from '@hilla/react-components/Icon.js';
import '@vaadin/icons';

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
