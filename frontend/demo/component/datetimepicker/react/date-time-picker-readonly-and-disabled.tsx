import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { DateTimePicker } from '@hilla/react-components/DateTimePicker.js';

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
