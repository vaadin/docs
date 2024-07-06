import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { DatePicker } from '@vaadin/react-components/DatePicker.js';
import { useForm, useFormPart } from '@vaadin/hilla-react-form';
import AppointmentModel from 'Frontend/generated/com/vaadin/demo/domain/AppointmentModel';

function Example() {
  // tag::snippet[]
  const { model, field } = useForm(AppointmentModel);
  const dateField = useFormPart(model.startDate);

  useEffect(() => {
    dateField.addValidator({
      message: 'Select a weekday',
      validate: (startDate: string) => {
        const date = new Date(startDate);
        const isWeekday = date.getDay() >= 1 && date.getDay() <= 5;
        return isWeekday;
      },
    });
  }, []);

  return (
    <DatePicker
      label="Meeting date"
      helperText="Mondays – Fridays only"
      {...field(model.startDate)}
    />
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
