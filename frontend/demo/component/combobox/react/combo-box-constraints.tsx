import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { ComboBox } from '@vaadin/react-components';

function Example() {
  return (
    // tag::snippet[]
    <ComboBox
      required
      allowedCharPattern="[A-Z]"
      label="Country code"
      helperText="2-letter uppercase ISO country code"
      allowCustomValue
      items={['DE', 'FI', 'US']}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
