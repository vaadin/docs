import { reactExample } from 'Frontend/demo/react-example';
import React, { useState } from 'react';
import { TextArea } from '@hilla/react-components/TextArea.js';

function Example() {
  const charLimit = 600;
  const [text, setText] = useState(loremIpsum);

  return (
    <>
      {/* tag::snippet[] */}
      <TextArea
        label="Description"
        maxLength={charLimit}
        value={text}
        helperText={`${text.length}/${charLimit}`}
        onValueChanged={(event) => setText(event.detail.value)}
      ></TextArea>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
