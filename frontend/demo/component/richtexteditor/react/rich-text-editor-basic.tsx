import { reactExample } from 'Frontend/demo/react-example';
import React, { useState } from 'react';
import { RichTextEditor } from '@hilla/react-components/RichTextEditor.js';

function Example() {
  const [richText, setRichText] = useState(templates.richTextDelta);

  return (
    <>
      {/* tag::snippet[] */}
      <RichTextEditor
        style={{ maxHeight: '400px' }}
        value={richText}
        onValueChanged={(event) => setRichText(event.detail.value)}
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
