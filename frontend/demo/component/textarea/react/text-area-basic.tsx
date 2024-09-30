import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { TextArea } from '@vaadin/react-components/TextArea.js';

function Example() {
  useSignals(); // hidden-source-line
  const charLimit = 140;
  const text = useSignal('Great job. This is excellent!');

  return (
    // tag::snippet[]
    <TextArea
      label="Comment"
      maxlength={charLimit}
      value={text.value}
      helperText={`${text.value.length}/${charLimit}`}
      onValueChanged={(event) => {
        text.value = event.detail.value;
      }}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
