import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useComputed } from "@vaadin/hilla-react-signals";
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { DatePicker } from '@vaadin/react-components/DatePicker.js';
import { formatISO, lastDayOfYear } from 'date-fns';

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
