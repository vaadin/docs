import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { RichTextEditor } from '@vaadin/react-components-pro/RichTextEditor.js';
import templates from '../../../../../src/main/resources/data/templates.json';

function Example() {
  return (
    // tag::snippet[]
    <RichTextEditor style={{ height: '400px' }} readonly value={templates.richTextDelta} />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
