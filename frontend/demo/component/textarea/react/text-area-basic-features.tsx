import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { TextArea } from '@vaadin/react-components/TextArea.js';
import { Tooltip } from '@vaadin/react-components/Tooltip.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import '@vaadin/icons';

function Example() {
  return (
    // tag::snippet[]
    <TextArea
      label="Label"
      helperText="Helper text"
      placeholder="Placeholder"
      clearButtonVisible
      style={{ width: '100%' }}
    >
      <Tooltip slot="tooltip" text="Tooltip text" />
      <Icon slot="prefix" icon="vaadin:vaadin-h" />
      <span slot="suffix">:)</span>
    </TextArea>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
