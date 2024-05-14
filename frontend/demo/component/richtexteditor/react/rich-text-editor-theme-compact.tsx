import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { RichTextEditor } from '@vaadin/react-components-pro/RichTextEditor.js';
import templates from '../../../../../src/main/resources/data/templates.json';

function Example() {
  useSignals(); // hidden-source-line
  const richText = useSignal(templates.richTextDelta);

  return (
    // tag::snippet[]
    <RichTextEditor style={{ height: '400px' }} theme="compact" value={richText.value} />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
