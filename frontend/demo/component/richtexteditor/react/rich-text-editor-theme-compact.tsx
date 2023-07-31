import { reactExample } from 'Frontend/demo/react-example';
import React, { useState } from 'react';
import { RichTextEditor } from '@hilla/react-components/RichTextEditor.js';

function Example() {
  const [richText, setRichText] = useState(templates.richTextDelta);

  return (
    <>
      {/* tag::snippet[] */}
      <RichTextEditor style={{ height: '400px' }} theme="compact" value={richText} />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
