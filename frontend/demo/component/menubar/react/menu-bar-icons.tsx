import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Icon } from '@vaadin/react-components/Icon.js';
import { MenuBar, MenuBarItem } from '@vaadin/react-components/MenuBar.js';

function createItem(iconName: string, text: string, isChild = false) {
  const iconStyle: React.CSSProperties = {
    width: isChild ? 'var(--lumo-icon-size-s)' : '',
    height: isChild ? 'var(--lumo-icon-size-s)' : '',
    marginRight: isChild ? 'var(--lumo-space-s)' : '',
  };

  let ariaLabel = '';
  if (iconName === 'copy') {
    ariaLabel = 'duplicate';
  }

  return (
    <>
      <Icon icon={`vaadin:${iconName}`} style={iconStyle} aria-label={ariaLabel} />
      {text}
    </>
  );
}

function Example() {
  // tag::snippet[]
  const items: Array<MenuBarItem> = [
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
