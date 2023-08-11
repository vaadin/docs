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
        monthNames: [
          'Januar',
          'Februar',
          'März',
          'April',
          'Mai',
          'Juni',
          'Juli',
          'August',
          'September',
          'Oktober',
          'November',
          'Dezember',
        ],
        weekdays: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
        weekdaysShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
        today: 'Heute',
        cancel: 'Abbrechen',
      };
    }
  });

  return <DatePicker label="Sitzungsdatum" ref={datePickerRef} />;
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
