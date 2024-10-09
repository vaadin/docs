import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { DateTimePicker } from '@vaadin/react-components/DateTimePicker.js';
import { Tooltip } from '@vaadin/react-components/Tooltip.js';

function Example() {
  return (
    // tag::snippet[]
    <DateTimePicker
      label="Label"
      helperText="Helper text"
      datePlaceholder="Date"
      timePlaceholder="Time"
    >
      <Tooltip slot="tooltip" text="Tooltip text" />
    </DateTimePicker>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
