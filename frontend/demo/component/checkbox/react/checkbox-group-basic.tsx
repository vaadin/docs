import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { Checkbox, CheckboxGroup } from '@vaadin/react-components';

function Example() {
  const [value, setValue] = useState(['0', '2']);

  return (
    // tag::snippet[]
    <CheckboxGroup
      label="Export data"
      value={value}
      onValueChanged={(event) => setValue(event.detail.value)}
      theme="vertical"
    >
      <Checkbox value="0" label="Order ID" />
      <Checkbox value="1" label="Product name" />
      <Checkbox value="2" label="Customer" />
      <Checkbox value="3" label="Status" />
    </CheckboxGroup>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
