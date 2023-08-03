import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { DatePicker } from '@hilla/react-components/DatePicker.js';
import { formatISO, addDays, isBefore, isAfter, parse } from 'date-fns';

function Example() {
  const minDate = new Date();
  const maxDate = addDays(new Date(), 60);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    // tag::snippet[]
    <DatePicker
      label="Appointment date"
      helperText="Must be within 60 days from today"
      min={formatISO(minDate, { representation: 'date' })}
      max={formatISO(maxDate, { representation: 'date' })}
      errorMessage={errorMessage}
      onChange={({ target }) => {
        const date = parse(target.value ?? '', 'yyyy-MM-dd', new Date());
        if (isBefore(date, minDate)) {
          setErrorMessage('Too early, choose another date');
        } else if (isAfter(date, maxDate)) {
          setErrorMessage('Too late, choose another date');
        } else {
          setErrorMessage('');
        }
      }}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
