import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { FormLayout } from '@hilla/react-components/FormLayout.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { PasswordField } from '@hilla/react-components/PasswordField.js';

function Example() {
  const responsiveSteps = [
    { minWidth: '0', columns: 1 },
    { minWidth: '500px', columns: 2 },
  ];

  return (
    <FormLayout responsiveSteps={responsiveSteps}>
      <TextField label="First name" />
      <TextField label="Last name" />
      <TextField {...{ colspan: 2 }} label="Username" />
      <PasswordField label="Password" />
      <PasswordField label="Confirm password" />
    </FormLayout>
  );
}

export default reactExample(Example); // hidden-source-line
