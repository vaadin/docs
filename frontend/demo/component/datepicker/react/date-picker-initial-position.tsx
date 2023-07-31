import { reactExample } from 'Frontend/demo/react-example';
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

export default reactExample(Example);
