React: import { reactExample } from 'Frontend/demo/react-example';
import React, { useState } from 'react';
import { MenuBar } from '@hilla/react-components/MenuBar.js';

function Example() {
  const [items, setItems] = useState([
    {
      text: 'Options',
      children: [{ text: 'Save automatically', checked: true }, { text: 'Notify watchers' }],
    },
  ]);

  const itemSelected = (e) => {
    const item = e.detail.value;
    (item as SubMenuItem).checked = !(item as SubMenuItem).checked;
    setItems([...items]);
  };

  return <MenuBar items={items} onItemSelected={itemSelected}></MenuBar>;
}

export default reactExample(Example);
