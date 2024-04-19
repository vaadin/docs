import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { useComputed, useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { DatePicker } from '@vaadin/react-components/DatePicker.js';
import { formatISO, addDays, isBefore, isAfter, parse } from 'date-fns';

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
      min={formatISO(minDate.value, { representation: 'date' })}
      max={formatISO(maxDate.value, { representation: 'date' })}
      errorMessage={errorMessage.value}
      onChange={({ target }) => {
        const date = parse(target.value ?? '', 'yyyy-MM-dd', new Date());
        if (isBefore(date, minDate.value)) {
          errorMessage.value = 'Too early, choose another date';
        } else if (isAfter(date, maxDate.value)) {
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
