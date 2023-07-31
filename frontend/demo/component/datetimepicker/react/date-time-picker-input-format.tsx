import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect, useRef } from 'react';
import { DateTimePicker } from '@hilla/react-components/DateTimePicker.js';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';

function DateTimePickerInputFormat() {
  const dateTimePickerRef = useRef();

  useEffect(() => {
    const formatDate = (dateParts) => {
      const { year, month, day } = dateParts;
      const date = new Date(year, month, day);
      return dateFnsFormat(date, 'dd/MM/yyyy');
    };

    const parseDate = (inputValue) => {
      const date = dateFnsParse(inputValue, 'dd/MM/yyyy', new Date());
      return { year: date.getFullYear(), month: date.getMonth(), day: date.getDate() };
    };

    dateTimePickerRef.current.i18n = {
      ...dateTimePickerRef.current.i18n,
      formatDate,
      parseDate,
    };
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
