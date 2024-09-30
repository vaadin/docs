import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { DatePicker } from '@vaadin/react-components/DatePicker.js';
import { FormLayout } from '@vaadin/react-components/FormLayout.js';
import { TextField } from '@vaadin/react-components/TextField.js';
import { TimePicker } from '@vaadin/react-components/TimePicker.js';

function Example() {
  const responsiveSteps = [
    { minWidth: '0', columns: 1 },
    { minWidth: '20em', columns: 3 },
  ];

  return (
    <FormLayout responsiveSteps={responsiveSteps}>
      {/* tag::snippet[] */}
      <TextField label="Title" data-colspan="3" />
      {/* end::snippet[] */}
      <DatePicker label="Date" />
      <TimePicker label="From" />
      <TimePicker label="To" />
    </FormLayout>
  );
}

export default reactExample(Example); // hidden-source-line
