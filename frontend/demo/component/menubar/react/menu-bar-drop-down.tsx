import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { MenuBar } from '@hilla/react-components/MenuBar.js';

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
    // tag::snippet[]
    <MenuBar items={items}></MenuBar>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
