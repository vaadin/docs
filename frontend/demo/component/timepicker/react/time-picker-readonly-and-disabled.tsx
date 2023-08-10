import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { TimePicker } from '@hilla/react-components/TimePicker.js';

function Example() {
  return (
    // tag::snippet[]
    <HorizontalLayout theme="spacing">
      <TimePicker readonly label="Read-only" value="07:00" />

      <TimePicker disabled label="Disabled" />
    </HorizontalLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
