import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Switch } from '@vaadin/react-components/Switch.js';
import { Tooltip } from '@vaadin/react-components/Tooltip.js';

function Example() {
  return (
    // tag::snippet[]
    <Switch label="Autosave" helperText="Automatically save changes as you work">
      <Tooltip slot="tooltip" text="Last saved 5 minutes ago" />
    </Switch>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
