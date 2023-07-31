import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { DatePicker } from '@hilla/react-components/DatePicker.js';
import AppointmentModel from 'Frontend/generated/com/vaadin/demo/domain/AppointmentModel';
import { Binder, Field } from '@hilla/form';

const Example = () => {
  const binder = new Binder<Record<string, Field>>(AppointmentModel);

  binder.for(binder.model.startDate).addValidator({
    message: 'Select a weekday',
    validate: (startDate: string) => {
      const date = new Date(startDate);
      const isWeekday = date.getDay() >= 1 && date.getDay() <= 5;
      return isWeekday;
    },
  });

  return (
    <DatePicker
      label="Meeting date"
      helperText="Mondays – Fridays only"
      {...binder.model.startDate}
    />
  );
};

export default reactExample(Example);
