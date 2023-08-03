import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { EmailField } from '@hilla/react-components/EmailField.js';

function Example() {
  return (
    // tag::snippet[]
    <EmailField
      label="Email address"
      name="email"
      placeholder="username@example.com"
      errorMessage="Enter a valid example.com email address"
      clearButtonVisible
      pattern="^.+@example\\.com$"
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
