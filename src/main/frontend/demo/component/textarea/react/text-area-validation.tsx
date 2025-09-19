import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { TextArea, type TextAreaElement } from '@vaadin/react-components/TextArea.js';

function Example() {
  useSignals(); // hidden-source-line
  const errorMessage = useSignal('');

  return (
    // tag::snippet[]
    <TextArea
      required
      minlength={5}
      maxlength={50}
      pattern="^[A-Z]([A-Za-z0-9,-\s])*\.$"
      allowedCharPattern="[A-Za-z0-9,.\-\s]"
      label="Sentence"
      helperText="Must be one complete sentence ending in a period, between 5 and 50 characters long"
      style={{ width: '100%' }}
      errorMessage={errorMessage.value}
      onValidated={(event) => {
        const field = event.target as TextAreaElement;
        const { validity } = field.inputElement as HTMLTextAreaElement;
        if (validity.valueMissing) {
          errorMessage.value = 'Field is required';
        } else if (validity.tooShort) {
          errorMessage.value = `Minimum length is ${field.minlength} characters`;
        } else if (validity.tooLong) {
          errorMessage.value = `Maximum length is ${field.maxlength} characters`;
        } else if (!new RegExp(field.pattern).test(field.value)) {
          errorMessage.value = 'Must be one complete sentence ending in a period';
        } else {
          errorMessage.value = '';
        }
      }}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
