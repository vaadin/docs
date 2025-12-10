import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { Notification } from '@vaadin/react-components/Notification.js';

function Example() {
  useEffect(() => {
    // tag::snippet[]
    const notification = Notification.show('Failed to generate report', {
      position: 'middle',
      duration: 0,
      theme: 'error',
    });
    // end::snippet[]
  }, []);

  return <></>;
}

export default reactExample(Example); // hidden-source-line
