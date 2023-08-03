import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { DatePicker } from '@hilla/react-components/DatePicker.js';
import { CustomField } from '@hilla/react-components/CustomField.js';

function Example() {
  return (
    // tag::snippet[]
    <CustomField label="Enrollment period" helperText="Cannot be longer than 30 days" required>
      <DatePicker placeholder="Start date"></DatePicker>
      &ndash;
      <DatePicker placeholder="End date"></DatePicker>
    </CustomField>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
