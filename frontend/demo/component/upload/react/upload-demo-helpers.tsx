import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect, useState } from 'react';
import { Checkbox } from '@hilla/react-components/Checkbox.js';
import { CheckboxGroup } from '@hilla/react-components/CheckboxGroup.js';

function Example() {
  const [value, setValue] = useState(['0', '2']);

  return (
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
  );
}

export default reactExample(Example);
