import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { TextArea } from '@hilla/react-components/TextArea.js';

function Example() {
  const charLimit = 140;
  const [text, setText] = useState('Great job. This is excellent!');

  return (
    // tag::snippet[]
    <TextArea
      label="Comment"
      maxlength={charLimit}
      value={text}
      helperText={`${text.length}/${charLimit}`}
      onValueChanged={(event) => {
        setText(event.detail.value);
      }}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
