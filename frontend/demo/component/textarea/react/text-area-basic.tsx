import { reactExample } from 'Frontend/demo/react-example';
import React, { useState } from 'react';
import { TextArea } from '@hilla/react-components/TextArea.js';

function Example() {
  const charLimit = 140;
  const [text, setText] = useState('Great job. This is excellent!');

  return (
    <>
      {/* tag::snippet[] */}
      <TextArea
        label="Comment"
        maxLength={charLimit}
        value={text}
        helperText={`${text.length}/${charLimit}`}
        onValueChanged={(event) => {
          setText(event.detail.value);
        }}
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
