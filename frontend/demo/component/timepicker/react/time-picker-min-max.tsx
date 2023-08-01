import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { TimePicker } from '@hilla/react-components/TimePicker.js';
import type { TimePickerChangeEvent } from '@hilla/react-components/TimePicker.js';

function Example() {
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <>
      {/* tag::snippet[] */}
      <TimePicker
        label="Appointment time"
        helper-text="Open 8:00-16:00"
        value="08:30"
        min="08:00"
        max="16:00"
        step={60 * 30}
        errorMessage={errorMessage}
        onChange={(event: TimePickerChangeEvent) => {
          const { min, max, value } = event.target;
          if (value < min) {
            setErrorMessage('Too early, choose another time');
          } else if (value > max) {
            setErrorMessage('Too late, choose another time');
          } else {
            setErrorMessage('');
          }
        }}
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
