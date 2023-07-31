import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { MenuBar } from '@hilla/react-components/MenuBar.js';

function Example() {
  const items = [
    { text: 'View', theme: 'custom-theme' },
    { text: 'Edit' },
    {
      text: 'Share',
      children: [{ text: 'By email', theme: 'custom-theme' }, { text: 'Get link' }],
    },
  ];

  return <MenuBar items={items} />;
}

export default reactExample(Example);
