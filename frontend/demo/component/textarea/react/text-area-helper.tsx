import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { TextArea } from '@hilla/react-components/TextArea.js';
import { loremIpsum } from '../../../../../src/main/resources/data/templates.json';

function Example() {
  const charLimit = 600;
  const [text, setText] = useState(loremIpsum);

  return (
    // tag::snippet[]
    <TextArea
      label="Description"
      maxlength={charLimit}
      value={text}
      helperText={`${text.length}/${charLimit}`}
      onValueChanged={(event) => setText(event.detail.value)}
      style={{ width: '100%' }}
    ></TextArea>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
