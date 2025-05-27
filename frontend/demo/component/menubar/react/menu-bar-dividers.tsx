import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { MenuBar, MenuBarItem } from '@vaadin/react-components/MenuBar.js';

function Example() {
  // tag::snippet[]
  const items: Array<MenuBarItem> = [
    {
      text: 'Share',
      children: [
        { text: 'Facebook' },
        { text: 'Twitter' },
        { text: 'Instagram' },
        { component: 'hr' },
        { text: 'By email' },
        { text: 'Get link' },
        { component: 'hr' },
        { text: 'Set permissions' },
      ],
    },
  ];

  return <MenuBar items={items} />;
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
