import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { TextArea } from '@vaadin/react-components/TextArea.js';
import templates from '../../../../../src/main/resources/data/templates.json';

function Example() {
  useSignals(); // hidden-source-line
  const charLimit = 600;
  const text = useSignal(templates.loremIpsum);

  return (
    // tag::snippet[]
    <TextArea
      label="Description"
      maxlength={charLimit}
      value={text.value}
      helperText={`${text.value.length}/${charLimit}`}
      onValueChanged={(event) => {
        text.value = event.detail.value;
      }}
      style={{ width: '100%' }}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
