import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect, useRef } from 'react';
import { DatePicker } from '@hilla/react-components/DatePicker.js';

function Example() {
  const datePickerRef = useRef(null);

  useEffect(() => {
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
  }, []);

  return <DatePicker label="Sitzungsdatum" ref={datePickerRef} />;
}

export default reactExample(Example);
