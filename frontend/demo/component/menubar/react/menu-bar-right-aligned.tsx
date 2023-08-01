import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { MenuBar } from '@hilla/react-components/MenuBar.js';

function Example() {
  const items = [
    { text: 'View' },
    { text: 'Edit' },
    {
      text: 'Share',
      children: [{ text: 'By email' }, { text: 'Get link' }],
    },
  ];

  return (
    <>
      {/* tag::snippet[] */}
      <MenuBar theme="end-aligned" items={items} />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
