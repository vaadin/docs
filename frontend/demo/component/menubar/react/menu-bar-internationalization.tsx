import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { MenuBar, type MenuBarI18n } from '@hilla/react-components/MenuBar.js';

function Example() {
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

  // tag::snippet[]
  const customI18n: MenuBarI18n = {
    // Provide accessible label for the overflow menu button
    // to screen readers
    moreOptions: 'More actions',
  };

  return <MenuBar i18n={customI18n} items={items} />;
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
