import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { ComboBox } from '@vaadin/react-components';

function Example() {
  const [items, setItems] = useState(['Chrome', 'Edge', 'Firefox', 'Safari']);

  return (
    // tag::snippet[]
    <ComboBox
      allowCustomValue
      label="Browser"
      helperText="Select or type a browser"
      items={items}
      onCustomValueSet={(event) => {
        setItems([...items, event.detail]);
      }}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
