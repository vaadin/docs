import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { MenuBar } from '@hilla/react-components/MenuBar.js';

function Example() {
  const items = [
    {
      text: 'Share',
      children: [
        { text: 'Facebook' },
        { text: 'Twitter' },
        { text: 'Instagram' },
        { html: <hr /> },
        { text: 'By email' },
        { text: 'Get link' },
        { html: <hr /> },
        { text: 'Set permissions' },
      ],
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

export default reactExample(Example); // hidden-source-line
