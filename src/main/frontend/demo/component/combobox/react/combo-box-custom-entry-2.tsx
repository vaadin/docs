import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { ComboBox } from '@vaadin/react-components/ComboBox.js';

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal(['Chrome', 'Edge', 'Firefox', 'Safari']);

  return (
    // tag::snippet[]
    <ComboBox
      allowCustomValue
      label="Browser"
      helperText="Select or type a browser"
      items={items.value}
      onCustomValueSet={(event) => {
        items.value = [...items.value, event.detail];
      }}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
