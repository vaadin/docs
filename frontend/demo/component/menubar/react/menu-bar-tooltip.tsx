import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { MenuBar } from '@hilla/react-components/MenuBar.js';
import { Tooltip } from '@hilla/react-components/Tooltip.js';
import { Icon } from '@hilla/react-components/Icon.js';

function Example() {
  const items = [
    {
      component: createItem('eye'),
      tooltip: 'View',
    },
    {
      component: createItem('pencil'),
      tooltip: 'Edit',
    },
    {
      component: createItem('folder'),
      tooltip: 'Move',
    },
    {
      component: createItem('copy'),
      tooltip: 'Duplicate',
    },
    {
      component: createItem('archive'),
      tooltip: 'Archive',
      disabled: true,
    },
  ];

  return (
    <>
      {/* tag::snippethtml[] */}
      <MenuBar items={items} theme="icon">
        <Tooltip slot="tooltip"></Tooltip>
      </MenuBar>
      {/* end::snippethtml[] */}
    </>
  );
}

function createItem(iconName: string) {
  return (
    <MenuBar.Item>
      <Icon icon={`vaadin:${iconName}`} />
    </MenuBar.Item>
  );
}

export default reactExample(Example);
