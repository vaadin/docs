import React from 'react';
import { MenuBar } from '@vaadin/react-components/MenuBar.js';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line

function Example() {
  // tag::snippet[]
  const items = [
    { text: 'View' },
    { text: 'Edit', disabled: true },
    {
      text: 'Share',
      children: [{ text: 'By email', disabled: true }, { text: 'Get link' }],
    },
  ];

  return <MenuBar items={items} />;
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
