import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { DatePicker } from '@vaadin/react-components/DatePicker.js';
import {
  CustomField,
  type CustomFieldValueChangedEvent,
} from '@vaadin/react-components/CustomField.js';
import { differenceInDays, parseISO } from 'date-fns';

function Example() {
  const [errorMessage, setErrorMessage] = useState('');

  // Workaround for missing form-binding support
  // See https://github.com/vaadin/hilla/issues/587
  function validate(e: CustomFieldValueChangedEvent) {
    const enrollmentPeriod = e.detail.value;
    const [from, to] = enrollmentPeriod.split('\t');

    if (from === '' || to === '') {
      return;
    }

    if (differenceInDays(parseISO(to), parseISO(from)) > 30) {
      setErrorMessage('Enrollment period cannot be longer than 30 days');
    } else {
      setErrorMessage('');
    }
  }

  return (
    // tag::snippet[]
    <CustomField
      label="Enrollment period"
      helperText="Cannot be longer than 30 days"
      errorMessage={errorMessage}
      invalid={errorMessage !== ''}
      required
      onValueChanged={validate}
    >
      <DatePicker accessibleName="Start date" placeholder="Start date" />
      &ndash;
      <DatePicker accessibleName="End date" placeholder="End date" />
    </CustomField>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
