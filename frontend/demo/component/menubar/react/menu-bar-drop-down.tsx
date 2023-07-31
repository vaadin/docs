import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { MenuBar } from '@hilla/react-components/MenuBar.js';
import { MenuItem } from '@hilla/react-components/MenuItem.js';

function Example() {
  // tag::snippet[]
  const items = [
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
  // end::snippet[]

  return (
    // tag::snippethtml[]
    <MenuBar items={items}></MenuBar>
    // end::snippethtml[]
  );
}

export default reactExample(Example);
