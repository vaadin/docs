import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { MenuBar } from '@hilla/react-components/MenuBar.js';
import { Icon } from '@hilla/react-components/Icon.js';

// tag::snippet[]
function Example() {
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

  return (
    <MenuBar theme="tertiary-inline" items={items}>
      {({ item }) => (
        <div>
          <Icon
            icon={`vaadin:${item.component.icon}`}
            aria-label={item.component.getAttribute('aria-label')}
          />
          {item.children &&
            item.children.map((subItem) => (
              <div key={subItem.text} style={{ paddingLeft: 'var(--lumo-space-s)' }}>
                {subItem.text}
              </div>
            ))}
        </div>
      )}
    </MenuBar>
  );
}

function createItem(iconName: string, ariaLabel: string) {
  const item = document.createElement('vaadin-menu-bar-item');
  const icon = document.createElement('vaadin-icon');
  item.setAttribute('aria-label', ariaLabel);
  icon.setAttribute('icon', `vaadin:${iconName}`);
  item.appendChild(icon);
  return item;
}
// end::snippet[]

export default reactExample(Example);
