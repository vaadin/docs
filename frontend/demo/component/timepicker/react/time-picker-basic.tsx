import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { TimePicker } from '@hilla/react-components/TimePicker.js';

function Example() {
  return (
    // tag::snippet[]
    <TimePicker label="Alarm" value="07:00" />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
