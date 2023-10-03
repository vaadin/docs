import React from 'react';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { Notification } from '@hilla/react-components/Notification.js';

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
