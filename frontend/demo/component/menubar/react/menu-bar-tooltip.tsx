import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Icon } from '@vaadin/react-components/Icon.js';
import { MenuBar, type MenuBarItem } from '@vaadin/react-components/MenuBar.js';
import { Tooltip } from '@vaadin/react-components/Tooltip.js';

function createItem(iconName: string) {
  return <Icon icon={`vaadin:${iconName}`} />;
}

function Example() {
  // tag::snippet[]
  const items: MenuBarItem[] = [
    { component: createItem('eye'), tooltip: 'View' },
    { component: createItem('pencil'), tooltip: 'Edit' },
    {
      component: createItem('folder'),
      tooltip: 'Move',
      children: [
        { text: 'To folder…', tooltip: 'Choose a destination folder' },
        { text: 'To archive', tooltip: 'Move to archive', tooltipPosition: 'end' },
      ],
    },
    { component: createItem('copy'), tooltip: 'Duplicate' },
    { component: createItem('trash'), tooltip: 'Delete', disabled: true },
  ];

  return (
    <MenuBar items={items} theme="icon">
      <Tooltip slot="tooltip" />
    </MenuBar>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
