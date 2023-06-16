import { reactExample } from 'Frontend/demo/react/react-example'; // hidden-source-line
export default reactExample(Example); // hidden-source-line
import React from 'react';
import '@vaadin/notification';

function Example() {
  return (
    // @ts-ignore
    <vaadin-notification-card slot="middle">Financial report generated</vaadin-notification-card>
  );
}
