import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Button } from '@vaadin/react-components/Button.js';
import { ContextMenu, type ContextMenuItem } from '@vaadin/react-components/ContextMenu.js';

function Example() {
  useSignals(); // hidden-source-line
  // tag::snippet[]
  const items = useSignal<ContextMenuItem[]>([
    { text: 'Share' },
    { text: 'Duplicate' },
    { text: 'Delete', className: 'text-error' },
  ]);
  // end::snippet[]

  return (
    <ContextMenu items={items.value} openOn="click">
      <Button>Actions</Button>
    </ContextMenu>
  );
}

export default reactExample(Example); // hidden-source-line
