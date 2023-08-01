import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useRef, useEffect } from 'react';
import {
  DateTimePicker,
  type DateTimePickerElement,
} from '@hilla/react-components/DateTimePicker.js';

function Example() {
  const dateTimePicker = useRef<DateTimePickerElement>(null);

  useEffect(() => {
    if (dateTimePicker.current) {
      dateTimePicker.current.i18n = {
        ...dateTimePicker.current.i18n,
        firstDayOfWeek: 1,
      };
    }
  }, []);

  return (
    <>
      {/* tag::snippet[] */}
      <DateTimePicker ref={dateTimePicker} label="Meeting date and time" showWeekNumbers />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
