import { reactExample } from 'Frontend/demo/react-example';
import React, { useState, useRef } from 'react';
import { RichTextEditor } from '@hilla/react-components/RichTextEditor.js';
import { TextArea } from '@hilla/react-components/TextArea.js';
import type { RichTextEditorChangeEvent } from '@hilla/react-components/RichTextEditor.js';

function Example() {
  const [htmlValue, setHtmlValue] = useState('');
  const [deltaValue, setDeltaValue] = useState('');

  const richTextEditorRef = useRef<RichTextEditor>(null);

  const handleEditorChange = (event: RichTextEditorChangeEvent) => {
    setDeltaValue(event.detail.value);
  };

  const handleHtmlChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setHtmlValue(value);
    if (richTextEditorRef.current) {
      richTextEditorRef.current.dangerouslySetHtmlValue(value);
    }
  };

  return (
    <>
      {/* tag::htmlsnippet[] */}
      <RichTextEditor
        style={{ height: '400px' }}
        value={deltaValue}
        onValueChanged={handleEditorChange}
        onHtmlValueChanged={(e) => setHtmlValue(e.detail.value)}
        ref={richTextEditorRef}
      />

      <TextArea
        label="HTML Value"
        helperText="Shows the HTML representation of the edited document. You can also modify or paste HTML here to see the changes reflected in the editor above. Note that you have to leave (blur) this field in order for the editor to update."
        style={{ width: '100%' }}
        value={htmlValue}
        onChange={handleHtmlChange}
      />

      <TextArea
        label="Delta Value"
        helperText="Shows the Delta representation of the edited document. You can also modify or paste the Delta JSON here to see the changes reflected in the editor above. Note that you have to leave (blur) this field in order for the editor to update."
        style={{ width: '100%' }}
        value={deltaValue}
        onChange={(e) => setDeltaValue(e.target.value)}
      />
      {/* end::htmlsnippet[] */}
    </>
  );
}

export default reactExample(Example);
