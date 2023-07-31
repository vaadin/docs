import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { DateTimePicker } from '@hilla/react-components/DateTimePicker.js';

function Example() {
  return (
    <>
      <DateTimePicker
        theme={['align-right', 'small', 'helper-above-field']}
        label="Label"
        helperText="Helper text"
        value="2020-06-12T12:30"
        style={{ '--vaadin-input-field-border-width': '1px' }}
      />
    </>
  );
}

export default reactExample(Example);
