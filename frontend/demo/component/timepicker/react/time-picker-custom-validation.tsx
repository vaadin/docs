import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { TimePicker } from '@hilla/react-components/TimePicker.js';
import { Binder } from '@hilla/form';
import AppointmentModel from 'Frontend/generated/com/vaadin/demo/domain/AppointmentModel';

function Example() {
  const binder = new Binder(this, AppointmentModel);

  React.useEffect(() => {
    binder.for(binder.model.startTime).addValidator({
      message: 'The selected time is not available',
      validate: (startTime: string) =>
        (startTime >= '08:00' && startTime <= '12:00') ||
        (startTime >= '13:00' && startTime <= '16:00'),
    });
  }, []);

  return (
    <>
      {/* tag::snippet[] */}
      <TimePicker
        label="Appointment time"
        helperText="Open 8:00-12:00, 13:00-16:00"
        min="08:00"
        max="16:00"
        step={60 * 30}
        {...binder.model.startTime}
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
