import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import {
  DatePicker,
  type DatePickerElement,
  type DatePickerDate,
} from '@vaadin/react-components/DatePicker.js';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';

// tag::snippet[]
function formatDateIso8601(dateParts: DatePickerDate) {
  const { year, month, day } = dateParts;
  const date = new Date(year, month, day);

  return dateFnsFormat(date, 'yyyy-MM-dd');
}

function parseDateIso8601(inputValue: string) {
  const date = dateFnsParse(inputValue, 'yyyy-MM-dd', new Date());

  return { year: date.getFullYear(), month: date.getMonth(), day: date.getDate() };
}

function Example() {
  useSignals(); // hidden-source-line
  const selectedDateValue = useSignal(dateFnsFormat(new Date(), 'yyyy-MM-dd'));

  const datePickerRef = useRef<DatePickerElement>(null);
  useEffect(() => {
    const datePicker = datePickerRef.current;
    if (datePicker) {
      datePicker.i18n = {
        ...datePicker.i18n,
        formatDate: formatDateIso8601,
        parseDate: parseDateIso8601,
      };
    }
  }, [datePickerRef.current]);

  return (
    <DatePicker
      ref={datePickerRef}
      label="Select a date:"
      value={selectedDateValue.value}
      helperText="Date picker configured to use ISO 8601 format"
      onValueChanged={(event) => {
        selectedDateValue.value = event.detail.value;
      }}
    />
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
