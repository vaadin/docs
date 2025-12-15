import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { ContextMenu, type ContextMenuItem } from '@vaadin/react-components';

function Example() {
  // tag::snippet[]
  const items: Array<ContextMenuItem<{ value: string }>> = [
    {
      text: 'Copy as plain text',
      value:
        'Context Menu\n\nContext Menu is a component that you can attach to any component to display a context menu.',
    },
    {
      text: 'Copy as HTML',
      value:
        '<h1>Context Menu</h1><p>Context Menu is a component that you can attach to any component to display a context menu.</p>',
    },
    {
      text: 'Copy as Markdown',
      value:
        '# Context Menu\n\nContext Menu is a component that you can attach to any component to display a context menu.',
    },
  ];

  return (
    <ContextMenu
      items={items}
      onItemSelected={(event) => {
        const { value } = event.detail.value;
        if (value) {
          navigator.clipboard.writeText(value);
        }
      }}
    >
      <h1>Context Menu</h1>
      <p>
        Context Menu is a component that you can attach to any component to display a context menu.
      </p>
    </ContextMenu>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
