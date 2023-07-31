import { reactExample } from 'Frontend/demo/react-example';
import { Button } from '@hilla/react-components/Button.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { NotificationCard } from '@hilla/react-components/NotificationCard.js';
import React from 'react';

function Example() {
  return (
    <>
      <NotificationCard slot="middle">
        <div>
          <div>Aria Bailey</div>
          <div
            style={{
              fontSize: 'var(--lumo-font-size-s)',
              color: 'var(--lumo-secondary-text-color)',
            }}
          >
            Yeah, I know. But could you help me with...
          </div>
        </div>
        <Button>View</Button>
        <Button theme="tertiary-inline">
          <Icon icon="lumo:cross" />
        </Button>
      </NotificationCard>
    </>
  );
}

export default reactExample(Example);
