import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { addDays, format, isAfter, isBefore, parseISO } from 'date-fns';
import { useSignal } from '@vaadin/hilla-react-signals';
import {
  type DatePickerElement,
  DateTimePicker,
  type DateTimePickerElement,
  type TimePickerElement,
} from '@vaadin/react-components';

// tag::snippet[]
function Example() {
  useSignals(); // hidden-source-line
  const errorMessage = useSignal('');
  const minDate = useSignal(new Date());
  const maxDate = useSignal(addDays(new Date(), 60));

  return (
    <DateTimePicker
      label="Appointment date and time"
      helperText="Must be within 60 days from today"
      min={format(minDate.value, `yyyy-MM-dd'T'HH:00:00`)}
      max={format(maxDate.value, `yyyy-MM-dd'T'HH:00:00`)}
      errorMessage={errorMessage.value}
      onValidated={(event) => {
        const field = event.target as DateTimePickerElement;
        const date = parseISO(field.value);
        const datePicker: DatePickerElement = field.querySelector('[slot=date-picker]')!;
        const timePicker: TimePickerElement = field.querySelector('[slot=time-picker]')!;
        const hasBadDateInput =
          !datePicker.value && !!(datePicker.inputElement as HTMLInputElement).value;
        const hasBadTimeInput =
          !timePicker.value && !!(timePicker.inputElement as HTMLInputElement).value;

        if (hasBadDateInput || hasBadTimeInput) {
          errorMessage.value = 'Invalid date and time';
        } else if (!field.value) {
          errorMessage.value = 'Field is required';
        } else if (isBefore(date, minDate.value)) {
          errorMessage.value = 'Too early, choose another date and time';
        } else if (isAfter(date, maxDate.value)) {
          errorMessage.value = 'Too late, choose another date and time';
        } else {
          errorMessage.value = '';
        }
      }}
    />
  );
}
// end::snippet[]

export default reactExample(Example); // hidden-source-line
