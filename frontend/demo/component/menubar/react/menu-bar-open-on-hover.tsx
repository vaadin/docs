import React from 'react';
import { MenuBar } from '@vaadin/react-components/MenuBar.js';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line

function Example() {
  // tag::snippet[]
  const items = [
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

  return <MenuBar items={items} openOnHover />;
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
