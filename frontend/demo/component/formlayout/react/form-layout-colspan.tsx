import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { DatePicker } from '@hilla/react-components/DatePicker.js';
import { FormLayout } from '@hilla/react-components/FormLayout.js';
import { TimePicker } from '@hilla/react-components/TimePicker.js';
import { TextField } from '@hilla/react-components/TextField.js';

function Example() {
  const responsiveSteps = [
    { minWidth: '0', columns: 1 },
    { minWidth: '20em', columns: 3 },
  ];

  return (
    <FormLayout responsiveSteps={responsiveSteps}>
      {/* tag::snippet[] */}
      <TextField label="Title" {...{ colspan: 3 }} />
      {/* end::snippet[] */}
      <DatePicker label="Date" />
      <TimePicker label="From" />
      <TimePicker label="To" />
    </FormLayout>
  );
}

export default reactExample(Example); // hidden-source-line
