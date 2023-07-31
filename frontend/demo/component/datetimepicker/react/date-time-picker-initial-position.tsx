import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { DateTimePicker } from '@hilla/react-components/DateTimePicker.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <DateTimePicker label="Meeting date and time" initialPosition={startOfNextMonthISOString} />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
