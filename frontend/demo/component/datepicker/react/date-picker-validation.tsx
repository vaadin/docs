import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { addDays, formatISO } from 'date-fns';
import { useComputed, useSignal } from '@vaadin/hilla-react-signals';
import { DatePicker, type DatePickerElement } from '@vaadin/react-components/DatePicker.js';

function Example() {
  useSignals(); // hidden-source-line
  const minDate = useComputed(() => new Date());
  const maxDate = useComputed(() => addDays(new Date(), 60));
  const errorMessage = useSignal('');

  return (
    // tag::snippet[]
    <DatePicker
      label="Appointment date"
      helperText="Must be within 60 days from today"
      required
      min={formatISO(minDate.value, { representation: 'date' })}
      max={formatISO(maxDate.value, { representation: 'date' })}
      errorMessage={errorMessage.value}
      onValidated={(event) => {
        const field = event.target as DatePickerElement;
        if (!field.value && (field.inputElement as HTMLInputElement).value) {
          errorMessage.value = 'Invalid date format';
        } else if (!field.value) {
          errorMessage.value = 'Field is required';
        } else if (field.value < field.min!) {
          errorMessage.value = 'Too early, choose another date';
        } else if (field.value > field.max!) {
          errorMessage.value = 'Too late, choose another date';
        } else {
          errorMessage.value = '';
        }
      }}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
