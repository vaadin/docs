import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Markdown } from '@vaadin/react-components/Markdown.js';

function Example() {
  // tag::snippet[]
  const markdownText = `
Deploy checklist for tomorrow:
Run the test suite
Bump the version number
Tag the release
  `;

  return <Markdown lineBreaks>{markdownText}</Markdown>;
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
