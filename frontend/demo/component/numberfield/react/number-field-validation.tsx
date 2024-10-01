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
        const { validity } = field.inputElement as HTMLInputElement;
        if (validity.badInput) {
          errorMessage.value = 'Invalid number format';
        } else if (validity.valueMissing) {
          errorMessage.value = 'Field is required';
        } else if (validity.rangeUnderflow) {
          errorMessage.value = `Quantity must be at least ${field.min}`;
        } else if (validity.rangeOverflow) {
          errorMessage.value = `Maximum ${field.max} items available`;
        } else {
          errorMessage.value = '';
        }
      }}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
