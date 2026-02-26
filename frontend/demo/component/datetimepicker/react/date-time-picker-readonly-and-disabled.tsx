import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { DateTimePicker } from '@vaadin/react-components/DateTimePicker.js';
import { FormLayout } from '@vaadin/react-components/FormLayout.js';

function Example() {
  return (
    <FormLayout autoResponsive columnWidth="20rem">
      {/* tag::snippet[] */}
      <DateTimePicker readonly label="Read-only" value="2020-06-12T12:30" />

      <DateTimePicker disabled label="Disabled" />
      {/* end::snippet[] */}
    </FormLayout>
  );
}

export default reactExample(Example); // hidden-source-line
