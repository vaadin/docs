import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import {
  EmailField,
  FormLayout,
  FormRow,
  PasswordField,
  TextField,
} from '@vaadin/react-components';

function Example() {
  // tag::snippet[]
  return (
    <FormLayout autoResponsive>
      <FormRow>
        <TextField label="First name" />
        <TextField label="Last name" />
      </FormRow>
      <FormRow>
        <EmailField label="Email" />
      </FormRow>
      <FormRow>
        <PasswordField label="Password" />
        <PasswordField label="Confirm password" />
      </FormRow>
    </FormLayout>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
