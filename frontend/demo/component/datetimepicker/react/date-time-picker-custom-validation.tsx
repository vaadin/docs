import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useForm, useFormPart } from '@vaadin/hilla-react-form';
import { DateTimePicker } from '@vaadin/react-components/DateTimePicker.js';
import AppointmentModel from 'Frontend/generated/com/vaadin/demo/domain/AppointmentModel';

function Example() {
  // tag::snippet[]
  const { model, field } = useForm(AppointmentModel);
  const dateTimeField = useFormPart(model.startDateTime);
  const errorMessage = 'The selected day of week or time is not available';

  useEffect(() => {
    dateTimeField.addValidator({
      message: errorMessage,
      validate: (startDateTime: string) => {
        const date = new Date(startDateTime);
        const isWeekday = date.getDay() >= 1 && date.getDay() <= 5;
        return isWeekday;
      },
    });

    dateTimeField.addValidator({
      message: errorMessage,
      validate: (startDateTime: string) => {
        const time = startDateTime.split('T')[1];
        const validTime =
          (time >= '08:00' && time <= '12:00') || (time >= '13:00' && time <= '16:00');
        return validTime;
      },
    });
  }, []);

  return (
    <DateTimePicker
      label="Appointment date and time"
      helperText="Open Mondays-Fridays, 8:00-12:00, 13:00-16:00"
      step={60 * 30}
      {...field(model.startDateTime)}
    />
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
