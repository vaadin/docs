import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import {
  PasswordField,
  type PasswordFieldElement,
} from '@vaadin/react-components/PasswordField.js';

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
        const { validity } = field.inputElement as HTMLInputElement;
        if (validity.valueMissing) {
          errorMessage.value = 'Field is required';
        } else if (validity.tooShort) {
          errorMessage.value = `Minimum length is ${field.minlength} characters`;
        } else if (validity.tooLong) {
          errorMessage.value = `Maximum length is ${field.maxlength} characters`;
        } else if (validity.patternMismatch) {
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
