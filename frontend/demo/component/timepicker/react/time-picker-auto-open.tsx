import React from 'react';
import { TimePicker } from '@vaadin/react-components/TimePicker.js';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line

const Example = () => (
  // tag::snippet[]
  <TimePicker label="Alarm" value="05:30" step={60 * 30} autoOpenDisabled />
  // end::snippet[]
);

export default reactExample(Example); // hidden-source-line
