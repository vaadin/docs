import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { DatePicker } from '@hilla/react-components/DatePicker';
import { Icon } from '@hilla/react-components/Icon';
import { Tooltip } from '@hilla/react-components/Tooltip';
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
