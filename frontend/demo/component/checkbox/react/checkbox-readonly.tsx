import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { Checkbox } from '@vaadin/react-components/Checkbox.js';
import { CheckboxGroup } from '@vaadin/react-components/CheckboxGroup.js';

function Example() {
  const [value] = useState(['0', '2']);

  return (
    // tag::snippet[]
    <CheckboxGroup label="Export data" value={value} readonly theme="vertical">
      <Checkbox value="0" label="Order ID" />
      <Checkbox value="1" label="Product name" />
      <Checkbox value="2" label="Customer" />
      <Checkbox value="3" label="Status" />
    </CheckboxGroup>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
