import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { DatePicker } from '@hilla/react-components/DatePicker.js';
import { formatISO, lastDayOfYear } from 'date-fns';

function Example() {
  const lastDayOfTheYear = lastDayOfYear(Date.now());

  return (
    <>
      {/* tag::snippet[] */}
      <DatePicker
        label="Q4 deadline"
        initialPosition={formatISO(lastDayOfTheYear, { representation: 'date' })}
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
