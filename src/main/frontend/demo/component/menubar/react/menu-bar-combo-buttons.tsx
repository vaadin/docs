import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Icon } from '@vaadin/react-components/Icon.js';
import { MenuBar, type MenuBarItem } from '@vaadin/react-components/MenuBar.js';

function Example() {
  // tag::snippet[]
  const items: MenuBarItem[] = [
    { text: 'Save' },
    {
      component: <Icon icon="vaadin:chevron-down" aria-label="Other save options" />,
      children: [{ text: 'Save as draft' }, { text: 'Save as copy' }, { text: 'Save and publish' }],
    },
  ];

  return <MenuBar theme="icon primary" items={items} />;
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
