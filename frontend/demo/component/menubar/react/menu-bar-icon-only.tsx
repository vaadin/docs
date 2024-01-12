import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { MenuBar } from '@hilla/react-components/MenuBar.js';
import { Icon } from '@hilla/react-components/Icon.js';
import '@vaadin/icons';

function createItem(iconName: string, ariaLabel: string) {
  return <Icon icon={`vaadin:${iconName}`} aria-label={ariaLabel} />;
}

function Example() {
  // tag::snippet[]
  const items = [
    { component: createItem('eye', 'View') },
    { component: createItem('pencil', 'Edit') },
    {
      component: createItem('share', 'Share'),
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
      component: createItem('folder', 'Move'),
      children: [{ text: 'To folder' }, { text: 'To trash' }],
    },
    { component: createItem('copy', 'Duplicate') },
  ];

  return <MenuBar theme="icon" items={items} />;
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
