import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import {
  DateTimePicker,
  type DateTimePickerElement,
} from '@hilla/react-components/DateTimePicker.js';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import type { DatePickerDate } from '@vaadin/date-picker';

function DateTimePickerInputFormat() {
  const dateTimePickerRef = useRef<DateTimePickerElement>(null);

  useEffect(() => {
    const formatDate = (dateParts: DatePickerDate) => {
      const { year, month, day } = dateParts;
      const date = new Date(year, month, day);
      return dateFnsFormat(date, 'dd/MM/yyyy');
    };

    const parseDate = (inputValue: string) => {
      const date = dateFnsParse(inputValue, 'dd/MM/yyyy', new Date());
      return { year: date.getFullYear(), month: date.getMonth(), day: date.getDate() };
    };

    if (dateTimePickerRef.current) {
      dateTimePickerRef.current.i18n = {
        ...dateTimePickerRef.current.i18n,
        formatDate,
        parseDate,
      };
    }
  }, []);

  return (
    <>
      {/* tag::snippet[] */}
      <DateTimePicker
        label="Select date and time"
        helperText="Format: DD/MM/YYYY and HH:MM"
        datePlaceholder="Date"
        timePlaceholder="Time"
        ref={dateTimePickerRef}
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(DateTimePickerInputFormat);
