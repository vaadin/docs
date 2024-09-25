import React from 'react';
import { TimePicker } from '@vaadin/react-components/TimePicker.js';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line

function Example() {
  return (
    // tag::snippet[]
    <TimePicker label="Alarm" value="07:00" />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
