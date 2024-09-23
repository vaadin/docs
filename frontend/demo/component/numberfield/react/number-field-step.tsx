import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { NumberField, type NumberFieldElement } from '@vaadin/react-components/NumberField.js';

function Example() {
  useSignals(); // hidden-source-line
  const value = useSignal('12.5');
  const errorMessage = useSignal('');

  return (
    // tag::snippet[]
    <NumberField
      label="Duration (hours)"
      step={0.5}
      value={value.value}
      stepButtonsVisible
      errorMessage={errorMessage.value}
      onValueChanged={(event) => {
        value.value = event.detail.value;
      }}
      onValidated={(event) => {
        const field = event.target as NumberFieldElement;
        if ((field.inputElement as HTMLInputElement).validity.badInput) {
          errorMessage.value = 'Invalid number format';
        } else if (field.value && Number(field.value) % 0.5 !== 0) {
          errorMessage.value = 'Duration must be a multiple of 0.5';
        } else {
          errorMessage.value = '';
        }
      }}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
