import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import {
  MenuBar,
  type SubMenuItem,
  type MenuBarItemSelectedEvent,
} from '@vaadin/react-components/MenuBar.js';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line

function Example() {
  useSignals(); // hidden-source-line
  // tag::snippet[]
  const items = useSignal([
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
