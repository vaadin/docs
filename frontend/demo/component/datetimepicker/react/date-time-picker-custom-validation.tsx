import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { DateTimePicker } from '@hilla/react-components/DateTimePicker.js';

function Example() {
  const errorMessage = 'The selected day of week or time is not available';

  return (
    <>
      {/* tag::snippet[] */}
      <DateTimePicker
        label="Appointment date and time"
        helperText="Open Mondays-Fridays, 8:00-12:00, 13:00-16:00"
        step={60 * 30}
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
