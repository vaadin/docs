React: import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { DatePicker } from '@hilla/react-components/DatePicker.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <DatePicker
        label="Label"
        helperText="Helper text"
        value="2020-06-12"
        style={{ '--vaadin-input-field-border-width': '1px' }}
        className="align-right small helper-above-field"
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
