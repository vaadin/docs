import { reactExample } from 'Frontend/demo/react-example';
import React, { useState } from 'react';
import { MenuBar } from '@hilla/react-components/MenuBar.js';

// tag::snippet[]
function Example() {
  const [items] = useState([
    { text: 'View' },
    { text: 'Edit' },
    {
      text: 'Share',
      // Since MenuBar is hierarchical, provide the childItems inside another MenuBar,
      // as opposed to VaadinMenu, where they are just nested inside MenuBar.
      children: [
        <MenuBar text="On social media" key="1-2">
          <MenuBar text="Facebook" key="1-2-1" />
          <MenuBar text="Twitter" key="1-2-2" />
          <MenuBar text="Instagram" key="1-2-3" />
        </MenuBar>,
        <MenuBar text="By email" key="1-3" />,
        <MenuBar text="Get link" key="1-4" />,
      ],
    },
    {
      text: 'Move',
      children: [<MenuBar text="To folder" key="2-1" />, <MenuBar text="To trash" key="2-2" />],
    },
    { text: 'Duplicate' },
  ]);

  return (
    <>
      {/* tag::snippethtml[] */}
      <MenuBar items={items} openOnHover />
      {/* end::snippethtml[] */}
    </>
  );
}
// end::snippet[]

export default reactExample(Example);
