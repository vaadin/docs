import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { Notification } from '@vaadin/react-components/Notification.js';
import React from 'react';

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
