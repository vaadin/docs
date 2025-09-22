import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { DatePicker } from '@vaadin/react-components/DatePicker.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';

function Example() {
  useSignals(); // hidden-source-line
  const departureDate = useSignal('');
  const returnDate = useSignal('');

  return (
    // tag::snippet[]
    <HorizontalLayout theme="spacing">
      <DatePicker
        label="Departure date"
        max={returnDate.value}
        onValueChanged={(event) => {
          departureDate.value = event.detail.value;
        }}
      />

      <DatePicker
        label="Return date"
        min={departureDate.value}
        onValueChanged={(event) => {
          returnDate.value = event.detail.value;
        }}
      />
    </HorizontalLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
