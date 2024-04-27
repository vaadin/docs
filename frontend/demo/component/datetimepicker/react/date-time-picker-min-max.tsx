import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { DateTimePicker } from '@vaadin/react-components/DateTimePicker.js';
import { addDays, format, isAfter, isBefore, parseISO } from 'date-fns';

// tag::snippet[]
function Example() {
  useSignals(); // hidden-source-line
  const errorMessage = useSignal('');
  const value = useSignal(addDays(new Date(), 7));
  const minDate = useSignal(new Date());
  const maxDate = useSignal(addDays(new Date(), 60));

  return (
    <DateTimePicker
      label="Appointment date and time"
      helperText="Must be within 60 days from today"
      value={format(value.value, "yyyy-MM-dd'T'HH:00:00")}
      min={format(minDate.value, "yyyy-MM-dd'T'HH:00:00")}
      max={format(maxDate.value, "yyyy-MM-dd'T'HH:00:00")}
      errorMessage={errorMessage.value}
      onValueChanged={({ detail: { value: newValue } }) => {
        const date = parseISO(newValue ?? '');
        value.value = date;
        if (isBefore(date, minDate.value)) {
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
