import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { DateTimePicker } from '@vaadin/react-components/DateTimePicker.js';

function Example() {
  return (
    // tag::snippet[]
    <DateTimePicker label="Appointment" defaultTime="09:00" />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
