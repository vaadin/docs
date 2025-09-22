import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { MenuBar, type MenuBarItem } from '@vaadin/react-components/MenuBar.js';

function Example() {
  const items: MenuBarItem[] = [
    { text: 'View' },
    { text: 'Edit' },
    {
      text: 'Share',
      children: [
        {
          text: 'On social media',
          children: [{ text: 'Facebook' }, { text: 'Twitter' }, { text: 'Instagram' }],
        },
        { text: 'By email' },
        { text: 'Get link' },
      ],
    },
    {
      text: 'Move',
      children: [{ text: 'To folder' }, { text: 'To trash' }],
    },
    { text: 'Duplicate' },
  ];

  // tag::snippet[]
  return <MenuBar items={items} theme="dropdown-indicators" />;
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
