import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { MenuBar, type MenuBarItem } from '@vaadin/react-components';

function Example() {
  // tag::snippet[]
  const items: Array<MenuBarItem<{ value?: string }>> = [
    {
      text: 'Copy',
      children: [
        {
          text: 'Copy as plain text',
          value:
            'Menu Bar\n\nMenu Bar is a horizontal button bar with hierarchical drop-down menus.',
        },
        {
          text: 'Copy as HTML',
          value:
            '<h1>Menu Bar</h1><p>Menu Bar is a horizontal button bar with hierarchical drop-down menus.</p>',
        },
        {
          text: 'Copy as Markdown',
          value:
            '# Menu Bar\n\nMenu Bar is a horizontal button bar with hierarchical drop-down menus.',
        },
      ],
    },
  ];

  return (
    <MenuBar
      items={items}
      onItemSelected={(event) => {
        const { value } = event.detail.value;
        if (value) {
          navigator.clipboard.writeText(value);
        }
      }}
    />
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
