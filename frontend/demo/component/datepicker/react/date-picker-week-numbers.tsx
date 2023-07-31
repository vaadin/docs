import React, { useEffect, useRef } from 'react';
import { DatePicker } from '@hilla/react-components/DatePicker.js';

function Example() {
  const datePickerRef = useRef();

  useEffect(() => {
    datePickerRef.current.i18n = {
      ...datePickerRef.current.i18n,
      firstDayOfWeek: 1,
    };
  }, []);

  return (
    <>
      {/* tag::snippet[] */}
      <DatePicker label="Vacation start date" showWeekNumbers ref={datePickerRef} />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
