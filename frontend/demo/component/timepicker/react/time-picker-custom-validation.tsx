import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { TimePicker } from '@hilla/react-components/TimePicker.js';
import { Binder } from '@hilla/form';
import AppointmentModel from 'Frontend/generated/com/vaadin/demo/domain/AppointmentModel';

function Example() {
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
