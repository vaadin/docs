import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Switch } from '@vaadin/react-components/Switch.js';

function Example() {
  return (
    // tag::snippet[]
    <Switch
      label="Two-factor authentication"
      required
      checked
      errorMessage="Required by your workplace security policy"
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
