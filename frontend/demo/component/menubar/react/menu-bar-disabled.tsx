import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { MenuBar } from '@hilla/react-components/MenuBar.js';

function Example() {
  const items = [
    { text: 'View' },
    { text: 'Edit', disabled: true },
    {
      text: 'Share',
      children: [{ text: 'By email', disabled: true }, { text: 'Get link' }],
    },
  ];

  return (
    <>
      {/* tag::snippet[] */}
      <MenuBar items={items} />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);