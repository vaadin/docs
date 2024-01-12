import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { MenuBar } from '@hilla/react-components/MenuBar.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { Tooltip } from '@hilla/react-components/Tooltip.js';
import '@vaadin/icons';

function createItem(iconName: string) {
  return <Icon icon={`vaadin:${iconName}`} />;
}

function Example() {
  // tag::snippet[]
  const items = [
    { component: createItem('eye'), tooltip: 'View' },
    { component: createItem('pencil'), tooltip: 'Edit' },
    { component: createItem('folder'), tooltip: 'Move' },
    { component: createItem('copy'), tooltip: 'Duplicate' },
    { component: createItem('archive'), tooltip: 'Archive', disabled: true },
  ];

  return (
    <MenuBar items={items} theme="icon">
      <Tooltip slot="tooltip" />
    </MenuBar>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
