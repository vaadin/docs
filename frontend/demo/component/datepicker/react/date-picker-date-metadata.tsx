import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { eachDayOfInterval, formatISO, parseISO } from 'date-fns';
import {
  DatePicker,
  type DatePickerDateMetadata,
  type DatePickerDateMetadataProvider,
} from '@vaadin/react-components/DatePicker.js';

// tag::snippet[]
// In a real application, these would query a booking service.
const isFullyBooked = (date: Date) => date.getDate() % 7 === 3;
const isAlmostFull = (date: Date) => date.getDate() % 5 === 0;

function getMetadata(date: Date): DatePickerDateMetadata | undefined {
  const isoDate = formatISO(date, { representation: 'date' });
  if (isFullyBooked(date)) {
    return { date: isoDate, disabled: true };
  }
  if (isAlmostFull(date)) {
    return { date: isoDate, part: 'limited' };
  }
  return undefined;
}

const dateMetadataProvider: DatePickerDateMetadataProvider = ({ start, end }) =>
  eachDayOfInterval({ start: parseISO(start), end: parseISO(end) })
    .map(getMetadata)
    .filter((metadata) => metadata !== undefined);

function Example() {
  return (
    <DatePicker
      label="Appointment date"
      helperText="Highlighted dates are almost full"
      dateMetadataProvider={dateMetadataProvider}
    />
  );
}
// end::snippet[]

export default reactExample(Example); // hidden-source-line
