import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import {
  DateTimePicker,
  type DateTimePickerElement,
} from '@hilla/react-components/DateTimePicker.js';

function Example() {
  const dateTimePickerRef = useRef<DateTimePickerElement>(null);

  useEffect(() => {
    if (dateTimePickerRef.current) {
      dateTimePickerRef.current.i18n = {
        ...dateTimePickerRef.current.i18n,
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
        dateLabel: 'datum',
        timeLabel: 'zeit',
      };
    }
  }, []);

  return <DateTimePicker ref={dateTimePickerRef} label="Sitzungsdatum" />;
}

export default reactExample(Example); // hidden-source-line
