import React from 'react';
import { MenuBar } from '@vaadin/react-components/MenuBar.js';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line

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

  return <MenuBar items={items} />;
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
