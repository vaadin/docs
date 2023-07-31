import { reactExample } from 'Frontend/demo/react-example';
import React, { useState } from 'react';
import { ContextMenu, ContextMenuItem } from '@hilla/react-components/ContextMenu.js';

function Example() {
  const [items, setItems] = useState<ContextMenuItem[]>([
    { text: 'Abigail Lewis', checked: true },
    { text: 'Allison Torres' },
    { text: 'Anna Myers' },
    { text: 'Lauren Wright' },
    { text: 'Tamaki Ryushi' },
  ]);

  const selectedItem = items.find((item) => item.checked);

  function itemSelected(value: ContextMenuItem) {
    setItems(items.map((item) => ({ ...item, checked: item === value })));
  }

  return (
    <ContextMenu items={items} onItemSelected={itemSelected}>
      <span>
        Assignee: <b>{selectedItem?.text}</b>
      </span>
    </ContextMenu>
  );
}

export default reactExample(Example);
