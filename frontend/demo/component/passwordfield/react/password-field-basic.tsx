import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { PasswordField } from '@hilla/react-components/PasswordField.js';

function Example() {
  return (
    // tag::snippet[]
    <PasswordField label="Password" value="Ex@mplePassw0rd" />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
