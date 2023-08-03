import { MenuBar, type MenuBarItem } from '@hilla/react-components/MenuBar.js';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';

function Example() {
  // tag::snippet[]
  const [selectedItem, setSelectedItem] = useState<MenuBarItem | undefined>(undefined);

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

  return (
    <>
      <MenuBar items={items} onItemSelected={(event) => setSelectedItem(event.detail.value)} />
      <div>Clicked item: {selectedItem?.text}</div>
    </>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
