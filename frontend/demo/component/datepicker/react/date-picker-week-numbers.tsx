import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import { DatePicker, type DatePickerElement } from '@hilla/react-components/DatePicker.js';

function Example() {
  // tag::snippet[]
  const datePickerRef = useRef<DatePickerElement>(null);

  useEffect(() => {
    if (datePickerRef.current) {
      datePickerRef.current.i18n = {
        ...datePickerRef.current.i18n,
        firstDayOfWeek: 1,
      };
    }
  }, []);

  return <DatePicker label="Vacation start date" showWeekNumbers ref={datePickerRef} />;
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
