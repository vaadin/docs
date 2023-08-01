import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { DateTimePicker } from '@hilla/react-components/DateTimePicker.js';

const initialStartValue = '2020-08-25T20:00';
const initialEndValue = '2020-09-01T20:00';

function Example() {
  const [startDateTime, setStartDateTime] = useState(initialStartValue);
  const [endDateTime, setEndDateTime] = useState(initialEndValue);

  return (
    <>
      {/* tag::snippet[] */}
      <div>
        <DateTimePicker
          label="Start date and time"
          value={startDateTime}
          onValueChanged={(event) => setStartDateTime(event.detail.value)}
        />

        <DateTimePicker
          label="End date and time"
          min={startDateTime}
          value={endDateTime}
          onValueChanged={(event) => setEndDateTime(event.detail.value)}
        />
      </div>
      {/* end::snippet[], remove comments to play along when testing */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
