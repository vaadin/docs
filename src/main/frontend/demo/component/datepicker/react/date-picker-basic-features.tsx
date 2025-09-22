import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { DatePicker } from '@vaadin/react-components/DatePicker';
import { Icon } from '@vaadin/react-components/Icon';
import { Tooltip } from '@vaadin/react-components/Tooltip';

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
