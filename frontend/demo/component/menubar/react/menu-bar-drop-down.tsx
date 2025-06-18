import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { MenuBar, type MenuBarItem } from '@vaadin/react-components/MenuBar.js';

function Example() {
  // tag::snippet[]
  const items: MenuBarItem[] = [
    {
      text: 'John Smith',
      children: [
        { text: 'Profile' },
        { text: 'Account' },
        { text: 'Preferences' },
        { component: 'hr' },
        { text: 'Sign out' },
      ],
    },
  ];

  return <MenuBar items={items} />;
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
