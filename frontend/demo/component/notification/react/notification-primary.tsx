import React from 'react';
import { Notification } from '@vaadin/react-components/Notification.js';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line

function Example() {
  // tag::snippet[]
  const notification = Notification.show('New project plan available', {
    position: 'middle',
    duration: 0,
    theme: 'primary',
  });
  // end::snippet[]

  return <></>;
}

export default reactExample(Example); // hidden-source-line
