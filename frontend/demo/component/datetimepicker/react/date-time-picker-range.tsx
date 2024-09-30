import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { DateTimePicker } from '@vaadin/react-components/DateTimePicker.js';

const initialStartValue = '2020-08-25T20:00';
const initialEndValue = '2020-09-01T20:00';

function Example() {
  useSignals(); // hidden-source-line
  const startDateTime = useSignal(initialStartValue);
  const endDateTime = useSignal(initialEndValue);

  return (
    // tag::snippet[]
    <div>
      <DateTimePicker
        label="Start date and time"
        value={startDateTime.value}
        onValueChanged={(event) => {
          startDateTime.value = event.detail.value;
        }}
      />

      <DateTimePicker
        label="End date and time"
        min={startDateTime.value}
        value={endDateTime.value}
        onValueChanged={(event) => {
          endDateTime.value = event.detail.value;
        }}
      />
    </div>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
