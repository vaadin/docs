import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { TextField, type TextFieldElement } from '@vaadin/react-components/TextField.js';

function Example() {
  useSignals(); // hidden-source-line
  const errorMessage = useSignal('');

  return (
    // tag::snippet[]
    <TextField
      required
      minlength={5}
      maxlength={18}
      pattern="^[+]?[\(]?[0-9]{3}[\)]?[\-]?[0-9]{3}[\-]?[0-9]{4,6}$"
      allowedCharPattern="[0-9()+-]"
      label="Phone number"
      helperText="Format: +(123)456-7890"
      errorMessage={errorMessage.value}
      onValidated={(event) => {
        const field = event.target as TextFieldElement;
        const { validity } = field.inputElement as HTMLInputElement;
        if (validity.valueMissing) {
          errorMessage.value = 'Field is required';
        } else if (validity.tooShort) {
          errorMessage.value = `Minimum length is ${field.minlength} characters`;
        } else if (validity.tooLong) {
          errorMessage.value = `Maximum length is ${field.maxlength} characters`;
        } else if (validity.patternMismatch) {
          errorMessage.value = 'Invalid phone number format';
        } else {
          errorMessage.value = '';
        }
      }}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
