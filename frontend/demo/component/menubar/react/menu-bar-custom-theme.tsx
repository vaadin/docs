import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { MenuBar } from '@hilla/react-components/MenuBar.js';

function Example() {
  // tag::snippet[]
  const items = [
    { text: 'View', theme: 'custom-theme' },
    { text: 'Edit' },
    {
      text: 'Share',
      children: [{ text: 'By email', theme: 'custom-theme' }, { text: 'Get link' }],
    },
  ];

  return <MenuBar items={items} />;
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
