import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Icon } from '@vaadin/react-components/Icon.js';
import { PasswordField } from '@vaadin/react-components/PasswordField.js';
import { Tooltip } from '@vaadin/react-components/Tooltip.js';

function Example() {
  return (
    // tag::snippet[]
    <PasswordField
      label="Label"
      helperText="Helper text"
      placeholder="Placeholder"
      clearButtonVisible
    >
      <Tooltip slot="tooltip" text="Tooltip text" />
      <Icon slot="prefix" icon="vaadin:lock" />
    </PasswordField>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
