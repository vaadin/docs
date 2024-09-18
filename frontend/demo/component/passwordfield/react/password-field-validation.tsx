import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import {
  PasswordField,
  type PasswordFieldElement,
} from '@vaadin/react-components/PasswordField.js';

function Example() {
  return (
    // tag::snippet[]
    <PasswordField
      pattern="^[A-Za-z0-9]+$"
      required
      minlength={6}
      maxlength={12}
      label="Password"
      helperText="6 to 12 characters. Only letters A-Z and numbers supported."
      onValidated={(event) => {
        const field = event.target as PasswordFieldElement;
        const value = field.value;
        if (!value) {
          field.errorMessage = 'Field is required';
        } else if (value.length < field.minlength!) {
          field.errorMessage = `Minimum length is ${field.minlength} characters`;
        } else if (value.length > field.maxlength!) {
          field.errorMessage = `Maximum length is ${field.maxlength} characters`;
        } else if (!new RegExp(field.pattern).test(value)) {
          field.errorMessage = 'Only letters A-Z and numbers are allowed';
        } else {
          field.errorMessage = '';
        }
      }}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
