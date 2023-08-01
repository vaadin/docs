import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { RichTextEditor } from '@hilla/react-components/RichTextEditor.js';
import templates from '../../../../../src/main/resources/data/templates.json';

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

export default reactExample(Example); // hidden-source-line
