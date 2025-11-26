import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Button } from '@vaadin/react-components/Button.js';
import { ContextMenu } from '@vaadin/react-components/ContextMenu.js';
import { Icon } from '@vaadin/react-components/Icon.js';

function Example() {
  return (
    // tag::snippet[]
    <ContextMenu
      openOn="click"
      renderer={() => <div style={{ padding: '1.5rem' }}>Show notifications here</div>}
    >
      <Button aria-label="notifications" theme="tertiary">
        <Icon icon="vaadin:bell-o" />
        <span style={{ position: 'absolute', transform: 'translate(-40%, -30%)' }}>
          <span {...{ theme: 'badge error primary small pill' }}>4</span>
        </span>
      </Button>
    </ContextMenu>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
