import React from 'react';
import { TimePicker } from '@vaadin/react-components/TimePicker.js';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line

function Example() {
  return (
    // tag::snippet[]
    <TimePicker label="Meeting time" value="12:30" step={60 * 30} />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
