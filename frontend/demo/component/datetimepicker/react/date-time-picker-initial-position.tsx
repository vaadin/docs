import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { addMonths, formatISO, startOfMonth } from 'date-fns';
import { DateTimePicker } from '@vaadin/react-components/DateTimePicker.js';

const startOfNextMonth = startOfMonth(addMonths(new Date(), 1));
const startOfNextMonthISOString = formatISO(startOfNextMonth, { representation: 'date' });

function Example() {
  return (
    // tag::snippet[]
    <DateTimePicker label="Meeting date and time" initialPosition={startOfNextMonthISOString} />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
