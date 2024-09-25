import React from 'react';
import { DatePicker } from '@vaadin/react-components/DatePicker.js';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line

function Example() {
  return (
    // tag::snippet[]
    <DatePicker label="Start date" placeholder="DD/MM/YYYY" helperText="Format: DD/MM/YYYY" />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
