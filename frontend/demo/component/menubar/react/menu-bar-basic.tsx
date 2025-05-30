import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { MenuBar, type MenuBarItem } from '@vaadin/react-components/MenuBar.js';

function Example() {
  useSignals(); // hidden-source-line
  // tag::snippet[]
  const selectedItem = useSignal<MenuBarItem | undefined>(undefined);

  const items: Array<MenuBarItem> = [
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
      <MenuBar
        items={items}
        onItemSelected={(event) => {
          selectedItem.value = event.detail.value;
        }}
      />
      <div>Clicked item: {selectedItem.value?.text}</div>
    </>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
