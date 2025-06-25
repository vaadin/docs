import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import {
  MenuBar,
  type MenuBarItem,
  type MenuBarItemSelectedEvent,
  type SubMenuItem,
} from '@vaadin/react-components/MenuBar.js';

function Example() {
  useSignals(); // hidden-source-line
  // tag::snippet[]
  const items = useSignal<MenuBarItem[]>([
    {
      text: 'Options',
      children: [{ text: 'Save automatically', checked: true }, { text: 'Notify watchers' }],
    },
  ]);

  const itemSelected = (e: MenuBarItemSelectedEvent) => {
    const item = e.detail.value;
    (item as SubMenuItem).checked = !(item as SubMenuItem).checked;
    items.value = [...items.value];
  };

  return <MenuBar items={items.value} onItemSelected={itemSelected} />;
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
