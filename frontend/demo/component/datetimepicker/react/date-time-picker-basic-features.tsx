import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { DateTimePicker } from '@hilla/react-components/DateTimePicker.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <DateTimePicker
        label="Label"
        helperText="Helper text"
        datePlaceholder="Date"
        timePlaceholder="Time"
      >
        <Tooltip slot="tooltip" text="Tooltip text" />
      </DateTimePicker>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
