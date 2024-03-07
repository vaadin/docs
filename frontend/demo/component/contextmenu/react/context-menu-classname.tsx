import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { Button, ContextMenu, type ContextMenuItem } from '@vaadin/react-components';

function Example() {
  // tag::snippet[]
  const [items] = useState<ContextMenuItem[]>([
    { text: 'Share' },
    { text: 'Duplicate' },
    { text: 'Delete', className: 'text-error' },
  ]);
  // end::snippet[]

  return (
    <ContextMenu items={items} openOn="click">
      <Button>Actions</Button>
    </ContextMenu>
  );
}

export default reactExample(Example); // hidden-source-line
