import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import {
  MenuBar,
  type SubMenuItem,
  type MenuBarItemSelectedEvent,
} from '@hilla/react-components/MenuBar.js';

function Example() {
  // tag::snippet[]
  const [items, setItems] = useState([
    {
      text: 'Options',
      children: [{ text: 'Save automatically', checked: true }, { text: 'Notify watchers' }],
    },
  ]);

  const itemSelected = (e: MenuBarItemSelectedEvent) => {
    const item = e.detail.value;
    (item as SubMenuItem).checked = !(item as SubMenuItem).checked;
    setItems([...items]);
  };

  return <MenuBar items={items} onItemSelected={itemSelected} />;
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
