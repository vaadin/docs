import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { FormLayout } from '@vaadin/react-components/FormLayout.js';
import { TextField } from '@vaadin/react-components/TextField.js';
import { PasswordField } from '@vaadin/react-components/PasswordField.js';

function Example() {
  // tag::snippet[]
  const responsiveSteps = [
    { minWidth: '0', columns: 1 },
    { minWidth: '500px', columns: 2 },
  ];

  return (
    <FormLayout responsiveSteps={responsiveSteps}>
      <TextField label="First name" />
      <TextField label="Last name" />
      <TextField label="Username" data-colspan="2" />
      <PasswordField label="Password" />
      <PasswordField label="Confirm password" />
    </FormLayout>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
