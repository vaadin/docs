import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import {
  ContextMenu,
  type ContextMenuItem,
  type ContextMenuItemSelectedEvent,
} from '@vaadin/react-components/ContextMenu.js';

function Example() {
  useSignals(); // hidden-source-line
  // tag::snippet[]
  const items = useSignal<ContextMenuItem[]>([
    { text: 'Abigail Lewis', checked: true },
    { text: 'Allison Torres' },
    { text: 'Anna Myers' },
    { text: 'Lauren Wright' },
    { text: 'Tamaki Ryushi' },
  ]);

  const selectedItem = items.value.find((item) => item.checked);

  function itemSelected(e: ContextMenuItemSelectedEvent) {
    items.value = items.value.map((item) => ({ ...item, checked: item === e.detail.value }));
  }

  return (
    <ContextMenu items={items.value} onItemSelected={itemSelected}>
      <span>
        Assignee: <b>{selectedItem?.text}</b>
      </span>
    </ContextMenu>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
