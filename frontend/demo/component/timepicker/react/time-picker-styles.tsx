import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { TimePicker } from '@hilla/react-components/TimePicker.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <TimePicker
        theme="align-right small helper-above-field"
        label="Label"
        helperText="Helper text"
        value="07:00"
        style={{ '--vaadin-input-field-border-width': '1px' }}
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
