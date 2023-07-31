import { reactExample } from 'Frontend/demo/react-example';
import { Binder } from '@hilla/form';
import { DatePicker } from '@hilla/react-components/DatePicker.js';
import { CustomField } from '@hilla/react-components/CustomField.js';
import AppointmentModel from 'Frontend/generated/com/vaadin/demo/domain/AppointmentModel';
import { applyTheme } from 'Frontend/generated/theme';
import { differenceInDays, isAfter, parseISO } from 'date-fns';
import React, { useEffect, useRef } from 'react';

function Example() {
  const startRef = useRef<DatePicker>(null);
  const endRef = useRef<DatePicker>(null);
  const binder = new Binder<AppointmentModel, 'enrollmentPeriod'>(AppointmentModel);

  useEffect(() => {
    startRef.current?.focusElement?.setAttribute('title', 'Start date');
    endRef.current?.focusElement?.setAttribute('title', 'End date');

    binder
      .for(binder.model.enrollmentPeriod)
      .addValidator({
        message: 'Dates cannot be more than 30 days apart',
        validate: (enrollmentPeriod) => {
          const [from, to] = enrollmentPeriod.split('\t');

          if (from === '' || to === '') {
            return true;
          }

          return differenceInDays(parseISO(to), parseISO(from)) <= 30;
        },
      })
      .addValidator({
        message: 'Start date must be earlier than end date',
        validate: (enrollmentPeriod) => {
          const [from, to] = enrollmentPeriod.split('\t');

          if (from === '' || to === '') {
            return true;
          }

          return isAfter(parseISO(to), parseISO(from));
        },
      });
  }, []);

  return (
    <>
      {/* tag::snippet[] */}
      <CustomField
        label="Enrollment period"
        helperText="Cannot be longer than 30 days"
        required
        {...{ field: binder.model.enrollmentPeriod }}
      >
        <DatePicker ref={startRef} placeholder="Start date"></DatePicker>
        &ndash;
        <DatePicker ref={endRef} placeholder="End date"></DatePicker>
      </CustomField>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
