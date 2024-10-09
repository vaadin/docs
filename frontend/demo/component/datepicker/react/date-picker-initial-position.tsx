import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { formatISO, lastDayOfYear } from 'date-fns';
import { useComputed } from '@vaadin/hilla-react-signals';
import { DatePicker } from '@vaadin/react-components/DatePicker.js';

function Example() {
  useSignals(); // hidden-source-line
  const lastDayOfTheYear = useComputed(() => lastDayOfYear(Date.now()));

  return (
    // tag::snippet[]
    <DatePicker
      label="Q4 deadline"
      initialPosition={formatISO(lastDayOfTheYear.value, { representation: 'date' })}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
