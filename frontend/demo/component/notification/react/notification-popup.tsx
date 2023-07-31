import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { ContextMenu } from '@hilla/react-components/ContextMenu.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <ContextMenu
        openOn="click"
        renderer={() => (
          <div style={{ padding: 'var(--lumo-space-l)' }}>Show notifications here</div>
        )}
      >
        <Button aria-label="notifications" theme="tertiary">
          <Icon icon="vaadin:bell-o" />
          <span style={{ position: 'absolute', transform: 'translate(-40%, -30%)' }}>
            <span {...{ theme: 'badge error primary small pill' }}>4</span>
          </span>
        </Button>
      </ContextMenu>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
