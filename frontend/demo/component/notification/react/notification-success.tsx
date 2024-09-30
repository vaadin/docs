import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Notification } from '@vaadin/react-components/Notification.js';

function Example() {
  // tag::snippet[]
  const notification = Notification.show('Financial report generated', {
    position: 'middle',
    duration: 0,
    theme: 'success',
  });
  // end::snippet[]

  return <></>;
}

export default reactExample(Example); // hidden-source-line
