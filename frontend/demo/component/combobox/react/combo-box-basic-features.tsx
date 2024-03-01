import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { ComboBox, Icon, Tooltip } from '@vaadin/react-components';
import '@vaadin/icons';

function Example() {
  return (
    // tag::snippet[]
    <ComboBox
      label="Label"
      helperText="Helper text"
      placeholder="Placeholder"
      clearButtonVisible
      items={['Value']}
    >
      <Tooltip slot="tooltip" text="Tooltip text" />
      <Icon slot="prefix" icon="vaadin:search" />
    </ComboBox>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
