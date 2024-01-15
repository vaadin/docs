import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { TextField } from '@vaadin/react-components/TextField.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import { Tooltip } from '@vaadin/react-components/Tooltip.js';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset';

function Example() {
  return (
    // tag::snippet[]
    <TextField placeholder="Search">
      <Icon icon="lumo:search" slot="prefix" />
      <Tooltip slot="tooltip" text="Wrap in “quotes” for exact phrase" />
    </TextField>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
