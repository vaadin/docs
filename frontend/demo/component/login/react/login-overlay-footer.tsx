import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { LoginOverlay } from '@vaadin/react-components/LoginOverlay.js';

function Example() {
  return (
    // tag::snippet[]
    <LoginOverlay>
      <p slot="footer" className="text-center">
        Never tell your password to anyone
      </p>
    </LoginOverlay>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
