import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useRef } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { TextArea, type TextAreaChangeEvent } from '@vaadin/react-components/TextArea.js';
import type {
  RichTextEditorElement,
  RichTextEditorValueChangedEvent,
} from '@vaadin/react-components-pro/RichTextEditor.js';
import { RichTextEditor } from '@vaadin/react-components-pro/RichTextEditor.js';

function Example() {
  useSignals(); // hidden-source-line
  // tag::snippet[]
  const htmlValue = useSignal('');
  const deltaValue = useSignal('');

  const richTextEditorRef = useRef<RichTextEditorElement>(null);

  const handleEditorChange = (event: RichTextEditorValueChangedEvent) => {
    deltaValue.value = event.detail.value;
  };

  const handleHtmlChange = (event: TextAreaChangeEvent) => {
    const { value } = event.target;
    htmlValue.value = value;
    if (richTextEditorRef.current) {
      richTextEditorRef.current.dangerouslySetHtmlValue(value);
    }
  };

  return (
    <>
      <RichTextEditor
        style={{ height: '400px' }}
        value={deltaValue.value}
        onValueChanged={handleEditorChange}
        onHtmlValueChanged={(e) => {
          htmlValue.value = e.detail.value;
        }}
        ref={richTextEditorRef}
      />

      <TextArea
        label="HTML Value"
        helperText="Shows the HTML representation of the edited document. You can also modify or paste HTML here to see the changes reflected in the editor above. Note that you have to leave (blur) this field in order for the editor to update."
        style={{ width: '100%' }}
        value={htmlValue.value}
        onChange={handleHtmlChange}
      />

      <TextArea
        label="Delta Value"
        helperText="Shows the Delta representation of the edited document. You can also modify or paste the Delta JSON here to see the changes reflected in the editor above. Note that you have to leave (blur) this field in order for the editor to update."
        style={{ width: '100%' }}
        value={deltaValue.value}
        onChange={(e) => {
          deltaValue.value = e.target.value;
        }}
      />
    </>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
