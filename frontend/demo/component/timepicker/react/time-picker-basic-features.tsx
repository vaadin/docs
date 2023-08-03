import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { TimePicker } from '@hilla/react-components/TimePicker.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { Tooltip } from '@hilla/react-components/Tooltip.js';
import '@vaadin/icons';

function Example() {
  return (
    // tag::snippet[]
    <TimePicker label="Label" helperText="Helper text" placeholder="Placeholder" clearButtonVisible>
      <Tooltip slot="tooltip" text="Tooltip text" />
      <Icon slot="prefix" icon="vaadin:vaadin-h" />
    </TimePicker>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
