import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { MenuBar, type MenuBarItem } from '@vaadin/react-components/MenuBar.js';

function Example() {
  // tag::snippet[]
  const items: MenuBarItem[] = [
    { text: 'View', className: 'custom' },
    { text: 'Edit' },
    {
      text: 'Share',
      children: [
        { text: 'By email', className: 'custom' },
        { text: 'Get link' },
      ],
    },
  ];

  return <MenuBar items={items} />;
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
