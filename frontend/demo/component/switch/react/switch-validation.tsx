import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Switch } from '@vaadin/react-components/Switch.js';

function Example() {
  return (
    // tag::snippet[]
    <Switch
      label="Two-factor authentication"
      helperText="Required by your workspace security policy"
      required
      errorMessage="Two-factor authentication can't be turned off"
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
