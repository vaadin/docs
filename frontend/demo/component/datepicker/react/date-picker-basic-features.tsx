import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { DatePicker, Icon, Tooltip } from '@vaadin/react-components';
import '@vaadin/icons/';

function Example() {
  return (
    // tag::snippet[]
    <DatePicker label="Label" helperText="Helper text" placeholder="Placeholder" clearButtonVisible>
      <Tooltip slot="tooltip" text="Tooltip text" />
      <Icon slot="prefix" icon="vaadin:vaadin-h" />
    </DatePicker>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
