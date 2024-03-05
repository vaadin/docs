import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { CustomField, DatePicker } from '@vaadin/react-components';
import { differenceInDays, isAfter, parseISO } from 'date-fns';
import { useForm, useFormPart } from '@vaadin/hilla-react-form';
import AppointmentModel from 'Frontend/generated/com/vaadin/demo/domain/AppointmentModel';

function Example() {
  const { model, field } = useForm(AppointmentModel);
  const periodField = useFormPart(model.enrollmentPeriod);

  periodField.addValidator({
    message: 'Dates cannot be more than 30 days apart',
    validate: (enrollmentPeriod: string) => {
      const [from, to] = enrollmentPeriod.split('\t');

      if (from === '' || to === '') {
        return true;
      }

      return differenceInDays(parseISO(to), parseISO(from)) <= 30;
    },
  });

  periodField.addValidator({
    message: 'Start date must be earlier than end date',
    validate: (enrollmentPeriod: string) => {
      const [from, to] = enrollmentPeriod.split('\t');

      if (from === '' || to === '') {
        return true;
      }

      return isAfter(parseISO(to), parseISO(from));
    },
  });

  return (
    // tag::snippet[]
    <CustomField
      label="Enrollment period"
      helperText="Cannot be longer than 30 days"
      required
      {...field(model.enrollmentPeriod)}
    >
      <DatePicker accessibleName="Start date" placeholder="Start date" />
      &ndash;
      <DatePicker accessibleName="End date" placeholder="End date" />
    </CustomField>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
