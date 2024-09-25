import '@vaadin/icons';
import React from 'react';
import { EmailField } from '@vaadin/react-components/EmailField.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import { Tooltip } from '@vaadin/react-components/Tooltip.js';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line

function Example() {
  return (
    // tag::snippet[]
    <EmailField label="Label" helperText="Helper text" placeholder="Placeholder" clearButtonVisible>
      <Tooltip slot="tooltip" text="Tooltip text" />
      <Icon slot="prefix" icon="vaadin:envelope" />
    </EmailField>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
