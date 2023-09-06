import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { MenuBar } from '@hilla/react-components/MenuBar.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';

function Example() {
  return (
    <HorizontalLayout>
      {/* tag::snippet[] */}
      <MenuBar items={[{ text: 'Default', children: [{ text: 'Item' }] }]} />
      <MenuBar theme="tertiary" items={[{ text: 'Tertiary', children: [{ text: 'Item' }] }]} />
      <MenuBar theme="primary" items={[{ text: 'Primary', children: [{ text: 'Item' }] }]} />
      <MenuBar theme="small" items={[{ text: 'Small', children: [{ text: 'Item' }] }]} />
      {/* end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
