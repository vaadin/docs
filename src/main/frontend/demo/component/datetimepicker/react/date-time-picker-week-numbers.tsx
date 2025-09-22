import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import {
  DateTimePicker,
  type DateTimePickerElement,
} from '@vaadin/react-components/DateTimePicker.js';

function Example() {
  // tag::snippet[]
  const dateTimePicker = useRef<DateTimePickerElement>(null);

  useEffect(() => {
    if (dateTimePicker.current) {
      dateTimePicker.current.i18n = {
        ...dateTimePicker.current.i18n,
        firstDayOfWeek: 1,
      };
    }
  }, [dateTimePicker.current]);

  return <DateTimePicker ref={dateTimePicker} label="Meeting date and time" showWeekNumbers />;
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
