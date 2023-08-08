import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { ComboBox } from '@hilla/react-components/ComboBox.js';

function Example() {
  const items = ['Chrome', 'Edge', 'Firefox', 'Safari'];

  return (
    // tag::snippet[]
    <ComboBox
      allowCustomValue
      label="Browser"
      helperText="Select or type a browser"
      items={items}
    ></ComboBox>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
