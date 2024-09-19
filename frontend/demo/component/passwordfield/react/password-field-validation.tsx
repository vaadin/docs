import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import {
  PasswordField,
  type PasswordFieldElement,
} from '@vaadin/react-components/PasswordField.js';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line

function Example() {
  useSignals(); // hidden-source-line
  const errorMessage = useSignal('');

  return (
    // tag::snippet[]
    <PasswordField
      pattern="^[A-Za-z0-9]+$"
      required
      minlength={6}
      maxlength={12}
      label="Password"
      helperText="6 to 12 characters. Only letters A-Z and numbers supported."
      errorMessage={errorMessage.value}
      onValidated={(event) => {
        const field = event.target as PasswordFieldElement;
        const value = field.value;
        if (!value) {
          errorMessage.value = 'Field is required';
        } else if (value.length < field.minlength!) {
          errorMessage.value = `Minimum length is ${field.minlength} characters`;
        } else if (value.length > field.maxlength!) {
          errorMessage.value = `Maximum length is ${field.maxlength} characters`;
        } else if (!new RegExp(field.pattern).test(value)) {
          errorMessage.value = 'Only letters A-Z and numbers are allowed';
        } else {
          errorMessage.value = '';
        }
      }}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
