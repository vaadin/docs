import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { TextArea } from '@hilla/react-components/TextArea.js';
import templates from '../../../../../src/main/resources/data/templates.json';

function Example() {
  return (
    // tag::snippet[]
    <TextArea
      label="Description"
      value={templates.loremIpsum}
      style={{ width: '100%', minHeight: '100px', maxHeight: '150px' }}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
