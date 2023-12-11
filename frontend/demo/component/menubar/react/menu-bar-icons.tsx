import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { MenuBar } from '@hilla/react-components/MenuBar.js';
import { Icon } from '@hilla/react-components/Icon.js';
import '@vaadin/icons';
import { createRoot } from 'react-dom/client';

function menuComponent(component: React.ReactNode) {
  const container = document.createElement('vaadin-menu-bar-item');
  createRoot(container).render(component);
  return container;
}

function createItem(iconName: string, text: string, isChild = false) {
  const iconStyle: React.CSSProperties = {};
  if (isChild) {
    iconStyle.width = 'var(--lumo-icon-size-s)';
    iconStyle.height = 'var(--lumo-icon-size-s)';
    iconStyle.marginRight = 'var(--lumo-space-s)';
  }

  let ariaLabel = '';
  if (iconName === 'copy') {
    ariaLabel = 'duplicate';
  }

  return menuComponent(
    <>
      <Icon icon={`vaadin:${iconName}`} style={iconStyle} aria-label={ariaLabel} />
      {text}
    </>
  );
}

function Example() {
  // tag::snippet[]
  const items = [
    {
      component: createItem('share', 'Share'),
      children: [
        { component: createItem('share', 'By email', true) },
        { component: createItem('link', 'Get link', true) },
      ],
    },
    {
      component: createItem('copy', ''),
    },
  ];

  return <MenuBar theme="icon" items={items} />;
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
