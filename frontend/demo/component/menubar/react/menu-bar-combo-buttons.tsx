import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { MenuBar } from '@hilla/react-components/MenuBar.js';
import { Icon } from '@hilla/react-components/Icon.js';
import '@vaadin/icons';

function Example() {
  // tag::snippet[]
  const items = [
    { text: 'Save' },
    {
      component: <Icon icon="vaadin:chevron-down" aria-label="Other save options" />,
      children: [{ text: 'Save as draft' }, { text: 'Save as copy' }, { text: 'Save and publish' }],
    },
  ];

  return <MenuBar theme="icon primary" items={items} />;
  // end::snippet[]
}

export default reactExample(Example);
