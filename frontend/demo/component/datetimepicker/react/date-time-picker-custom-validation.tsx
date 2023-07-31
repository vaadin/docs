import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect } from 'react';
import { DateTimePicker } from '@hilla/react-components/DateTimePicker.js';
import { Binder } from '@hilla/form';
import AppointmentModel from 'Frontend/generated/com/vaadin/demo/domain/AppointmentModel';

const Example = () => {
  const binder = new Binder(AppointmentModel);

  const errorMessage = 'The selected day of week or time is not available';

  useEffect(() => {
    binder.for(binder.model.startDateTime).addValidator({
      message: errorMessage,
      validate: (startDateTime: string) => {
        const date = new Date(startDateTime);
        const validWeekDay = date.getDay() >= 1 && date.getDay() <= 5;
        return validWeekDay;
      },
    });
    binder.for(binder.model.startDateTime).addValidator({
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
    <>
      {/* tag::snippet[] */}
      <DateTimePicker
        label="Appointment date and time"
        helperText="Open Mondays-Fridays, 8:00-12:00, 13:00-16:00"
        step={60 * 30}
        {...binder.model.startDateTime}
      />
      {/* end::snippet[] */}
    </>
  );
};

export default reactExample(Example);
