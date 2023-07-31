import { reactExample } from 'Frontend/demo/react-example';
import React, { useRef, useEffect } from 'react';
import { DateTimePicker } from '@hilla/react-components/DateTimePicker.js';

function Example() {
  const dateTimePicker = useRef();

  useEffect(() => {
    dateTimePicker.current.i18n = {
      ...dateTimePicker.current.i18n,
      firstDayOfWeek: 1,
    };
  }, []);

  return (
    <>
      {/* tag::snippet[] */}
      <DateTimePicker ref={dateTimePicker} label="Meeting date and time" showWeekNumbers />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
