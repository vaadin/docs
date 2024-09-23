import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { IntegerField, type IntegerFieldElement } from '@vaadin/react-components/IntegerField';

function Example() {
  useSignals(); // hidden-source-line
  const value = useSignal('2');
  const errorMessage = useSignal('');

  return (
    // tag::snippet[]
    <IntegerField
      label="Quantity"
      helperText="Max 10 items"
      required
      min={1}
      max={10}
      value={value.value}
      stepButtonsVisible
      errorMessage={errorMessage.value}
      onValueChanged={(event) => {
        value.value = event.detail.value;
      }}
      onValidated={(event) => {
        const field = event.target as IntegerFieldElement;
        if ((field.inputElement as HTMLInputElement).validity.badInput) {
          errorMessage.value = 'Invalid number format';
        } else if (!field.value) {
          errorMessage.value = 'Field is required';
        } else if (Number(field.value) < 1) {
          errorMessage.value = 'Quantity must be at least 1';
        } else if (Number(field.value) > 10) {
          errorMessage.value = 'Maximum 10 items available';
        } else {
          errorMessage.value = '';
        }
      }}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
