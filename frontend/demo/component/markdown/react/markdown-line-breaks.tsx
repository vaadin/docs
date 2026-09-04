import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Markdown } from '@vaadin/react-components/Markdown.js';

function Example() {
  // tag::snippet[]
  const markdownText = `
Hi Maria,
Your order shipped this morning.
It should arrive by Thursday.

Best regards,
Tom
  `;

  return <Markdown lineBreaks>{markdownText}</Markdown>;
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
