import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { DatePicker } from '@vaadin/react-components/DatePicker.js';
import {
  CustomField,
  type CustomFieldValueChangedEvent,
} from '@vaadin/react-components/CustomField.js';
import { differenceInDays, parseISO } from 'date-fns';

function Example() {
  useSignals(); // hidden-source-line
  const errorMessage = useSignal('');

  // Workaround for missing form-binding support
  // See https://github.com/vaadin/hilla/issues/587
  function validate(e: CustomFieldValueChangedEvent) {
    const enrollmentPeriod = e.detail.value;
    const [from, to] = enrollmentPeriod.split('\t');

    if (from === '' || to === '') {
      return;
    }

    if (differenceInDays(parseISO(to), parseISO(from)) > 30) {
      errorMessage.value = 'Enrollment period cannot be longer than 30 days';
    } else {
      errorMessage.value = '';
    }
  }

  return (
    // tag::snippet[]
    <CustomField
      label="Enrollment period"
      helperText="Cannot be longer than 30 days"
      errorMessage={errorMessage.value}
      invalid={errorMessage.value !== ''}
      required
      onValueChanged={validate}
    >
      <DatePicker placeholder="Start date"></DatePicker>
      &ndash;
      <DatePicker placeholder="End date"></DatePicker>
    </CustomField>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
