import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Markdown } from '@vaadin/react-components/Markdown.js';

function Example() {
  // tag::snippet[]
  const markdownText = `
## Rich Text Formatting

You can create **bold text**, *italicized text*, and \`inline code\` with simple Markdown syntax.
You can also ~~strike through~~ text when needed.

## Lists

### Ordered List:
1. First item
2. Second item
3. Third item with **bold text**

### Unordered List:
- Fruits
  - Apples 🍎
  - Bananas 🍌
  - Oranges 🍊
- Vegetables
  - Carrots
  - Broccoli

## Links & Quotes

> Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.

[Visit Vaadin website](https://vaadin.com) | [Learn more about Markdown](https://www.markdownguide.org/)
  `;

  return <Markdown>{markdownText}</Markdown>;
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
