import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { EmailField, type EmailFieldElement } from '@vaadin/react-components/EmailField.js';

function Example() {
  useSignals(); // hidden-source-line
  const errorMessage = useSignal('');

  return (
    // tag::snippet[]
    <EmailField
      required
      pattern="^[a-zA-Z0-9_\-+]+(?:\.[a-zA-Z0-9_\-+]+)*@example\.com$"
      label="Email address"
      helperText="Only example.com addresses allowed"
      errorMessage={errorMessage.value}
      onValidated={(event) => {
        const field = event.target as EmailFieldElement;
        const { validity } = field.inputElement as HTMLInputElement;
        if (validity.valueMissing) {
          errorMessage.value = 'Field is required';
        } else if (validity.patternMismatch) {
          errorMessage.value = 'Enter a valid example.com email address';
        } else {
          errorMessage.value = '';
        }
      }}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
