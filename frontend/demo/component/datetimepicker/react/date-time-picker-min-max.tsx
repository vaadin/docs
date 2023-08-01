import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { DateTimePicker } from '@hilla/react-components/DateTimePicker.js';
import { addDays, format, isAfter, isBefore, parseISO } from 'date-fns';

// tag::snippet[]
function Example() {
  const [errorMessage, setErrorMessage] = useState('');
  const [initialValue] = useState(() => addDays(new Date(), 7));
  const [minDate] = useState(new Date());
  const [maxDate] = useState(() => addDays(new Date(), 60));

  return (
    <DateTimePicker
      label="Appointment date and time"
      helperText="Must be within 60 days from today"
      value={format(initialValue, "yyyy-MM-dd'T'HH:00:00")}
      min={format(minDate, "yyyy-MM-dd'T'HH:00:00")}
      max={format(maxDate, "yyyy-MM-dd'T'HH:00:00")}
      errorMessage={errorMessage}
      onValueChanged={({ detail: { value } }) => {
        const date = parseISO(value ?? '');
        if (isBefore(date, minDate)) {
          setErrorMessage('Too early, choose another date and time');
        } else if (isAfter(date, maxDate)) {
          setErrorMessage('Too late, choose another date and time');
        } else {
          setErrorMessage('');
        }
      }}
    />
  );
}
// end::snippet[]

export default reactExample(Example); // hidden-source-line
