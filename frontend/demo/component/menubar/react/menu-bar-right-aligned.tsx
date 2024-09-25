import React from 'react';
import { MenuBar } from '@vaadin/react-components/MenuBar.js';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line

function Example() {
  const items = [
    { text: 'View' },
    { text: 'Edit' },
    {
      text: 'Share',
      children: [{ text: 'By email' }, { text: 'Get link' }],
    },
  ];

  return (
    // tag::snippet[]
    <MenuBar theme="end-aligned" items={items} />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
