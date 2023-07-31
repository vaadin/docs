import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { DateTimePicker } from '@hilla/react-components/DateTimePicker.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <VerticalLayout>
        <DateTimePicker readonly label="Read-only" value="2020-06-12T12:30" />
        <DateTimePicker disabled label="Disabled" />
      </VerticalLayout>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
