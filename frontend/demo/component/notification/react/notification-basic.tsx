import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Notification } from '@hilla/react-components/Notification.js';

function Example() {
  // tag::snippet[]
  const notification = Notification.show('Financial report generated', {
    position: 'middle',
    duration: 0,
  });
  // end::snippet[]

  return <></>;
}

export default reactExample(Example); // hidden-source-line
