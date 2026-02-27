import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Checkbox } from '@vaadin/react-components/Checkbox.js';
import { CheckboxGroup } from '@vaadin/react-components/CheckboxGroup.js';

function Example() {
  useSignals(); // hidden-source-line
  const exportData = useSignal(['0', '2']);

  return (
    // tag::snippet[]
    <CheckboxGroup
      label="Export data"
      value={exportData.value}
      onValueChanged={(event) => {
        exportData.value = event.detail.value;
      }}
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
