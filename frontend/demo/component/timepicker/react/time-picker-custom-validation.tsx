import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { TimePicker } from '@hilla/react-components/TimePicker.js';

function Example() {
  // This is a placeholder file. Binder support for React is not yet implemented. See https://github.com/vaadin/hilla/issues/587
  return (
    // tag::snippet[]
    <TimePicker
      label="Appointment time"
      helperText="Open 8:00-12:00, 13:00-16:00"
      min="08:00"
      max="16:00"
      step={60 * 30}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
