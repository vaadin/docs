import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Notification } from '@vaadin/react-components/Notification.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <Notification theme="info" position="middle" duration={0} opened>
        Default light color scheme
      </Notification>

      <Notification theme="info" position="middle" duration={0} overlayClass="dark" opened>
        Forced dark color scheme
      </Notification>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
