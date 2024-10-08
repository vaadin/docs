import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useForm, useFormPart } from '@vaadin/hilla-react-form';
import { TimePicker } from '@vaadin/react-components/TimePicker.js';
import AppointmentModel from 'Frontend/generated/com/vaadin/demo/domain/AppointmentModel';

function Example() {
  // tag::snippet[]
  const { model, field } = useForm(AppointmentModel);
  const timeField = useFormPart(model.startTime);

  useEffect(() => {
    timeField.addValidator({
      message: 'The selected time is not available',
      validate: (startTime: string) =>
        (startTime >= '08:00' && startTime <= '12:00') ||
        (startTime >= '13:00' && startTime <= '16:00'),
    });
  }, []);

  return (
    <TimePicker
      label="Appointment time"
      helperText="Open 8:00-12:00, 13:00-16:00"
      min="08:00"
      max="16:00"
      step={60 * 30}
      {...field(model.startTime)}
    />
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
