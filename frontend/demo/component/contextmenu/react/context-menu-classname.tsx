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
    { text: 'Success', className: 'text-success' },
    { text: 'Warning', className: 'text-warning' },
    { text: 'Error', className: 'text-error' },
  ]);
  // end::snippet[]

  const selectedItem = items.find((item) => item.checked);

  function itemSelected(e: ContextMenuItemSelectedEvent) {
    setItems(items.map((item) => ({ ...item, checked: item === e.detail.value })));
  }

  return (
    <ContextMenu items={items} onItemSelected={itemSelected}>
      <span>
        Status: <b className={selectedItem?.className || ''}>{selectedItem?.text}</b>
      </span>
    </ContextMenu>
  );
}

export default reactExample(Example); // hidden-source-line
