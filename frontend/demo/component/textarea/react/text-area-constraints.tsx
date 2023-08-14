import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { TextArea } from '@hilla/react-components/TextArea.js';

function Example() {
  return (
    // tag::snippet[]
    <TextArea
      required
      minlength={5}
      maxlength={50}
      pattern="^[A-Z]([A-Za-z0-9,-\s])*\.$"
      allowedCharPattern="[A-Za-z0-9,.\-\s]"
      label="Sentence"
      helperText="Must be one complete sentence ending in a period, between 5 and 50 characters long"
      style={{ width: '100%' }}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
