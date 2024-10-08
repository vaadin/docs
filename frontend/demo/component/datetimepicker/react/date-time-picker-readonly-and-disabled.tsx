import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { DateTimePicker } from '@vaadin/react-components/DateTimePicker.js';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';

function Example() {
  return (
    <VerticalLayout>
      {/* tag::snippet[] */}
      <DateTimePicker readonly label="Read-only" value="2020-06-12T12:30" />

      <DateTimePicker disabled label="Disabled" />
      {/* end::snippet[] */}
    </VerticalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
