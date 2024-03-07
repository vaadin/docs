import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { DatePicker, HorizontalLayout } from '@vaadin/react-components';

function Example() {
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  return (
    // tag::snippet[]
    <HorizontalLayout theme="spacing">
      <DatePicker
        label="Departure date"
        max={returnDate}
        onValueChanged={(event) => {
          setDepartureDate(event.detail.value);
        }}
      />

      <DatePicker
        label="Return date"
        min={departureDate}
        onValueChanged={(event) => {
          setReturnDate(event.detail.value);
        }}
      />
    </HorizontalLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
