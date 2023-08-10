import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import {
  ContextMenu,
  type ContextMenuItemSelectedEvent,
  type ContextMenuItem,
} from '@hilla/react-components/ContextMenu.js';

function Example() {
  // tag::snippet[]
  const [items, setItems] = useState<ContextMenuItem[]>([
    { text: 'Abigail Lewis', checked: true },
    { text: 'Allison Torres' },
    { text: 'Anna Myers' },
    { text: 'Lauren Wright' },
    { text: 'Tamaki Ryushi' },
  ]);

  const selectedItem = items.find((item) => item.checked);

  function itemSelected(e: ContextMenuItemSelectedEvent) {
    setItems(items.map((item) => ({ ...item, checked: item === e.detail.value })));
  }

  return (
    <ContextMenu items={items} onItemSelected={itemSelected}>
      <span>
        Assignee: <b>{selectedItem?.text}</b>
      </span>
    </ContextMenu>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
