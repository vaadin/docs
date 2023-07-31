import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { RichTextEditor } from '@hilla/react-components/RichTextEditor.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <RichTextEditor style={{ height: '400px' }} readonly value={templates.richTextDelta} />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
