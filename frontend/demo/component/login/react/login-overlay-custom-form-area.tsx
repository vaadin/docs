import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { IntegerField } from '@vaadin/react-components/IntegerField.js';
import { LoginOverlay } from '@vaadin/react-components/LoginOverlay.js';

function Example() {
  return (
    // tag::snippet[]
    <LoginOverlay opened no-autofocus>
      <IntegerField slot="custom-form-area" name="code" label="One-time code" />
    </LoginOverlay>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
