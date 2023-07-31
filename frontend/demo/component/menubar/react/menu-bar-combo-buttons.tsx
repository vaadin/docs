React: import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { MenuBar } from '@hilla/react-components/MenuBar.js';
import { Icon } from '@hilla/react-components/Icon.js';

function Example() {
  const createItem = () => {
    const item = React.createElement('vaadin-menu-bar-item');
    const icon = React.createElement(Icon, { icon: 'vaadin:chevron-down' });
    item.setAttribute('aria-label', 'Other save options');
    item.appendChild(icon);
    return item;
  };

  const items = [
    { text: 'Save' },
    {
      component: createItem(),
      children: [{ text: 'Save as draft' }, { text: 'Save as copy' }, { text: 'Save and publish' }],
    },
  ];

  return (
    <>
      {/* tag::snippethtml[] */}
      <MenuBar theme="icon primary" items={items} />
      {/* end::snippethtml[] */}
    </>
  );
}

export default reactExample(Example);
