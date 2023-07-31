import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { Notification } from '@hilla/react-components/Notification.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';

function Example() {
  return (
    <Notification slot="middle">
      <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
        <div>
          Jason Bailey mentioned you in <a href="#">Project Q4</a>
        </div>
        <Button theme="tertiary-inline">
          <Icon icon="lumo:cross" />
        </Button>
      </HorizontalLayout>
    </Notification>
  );
}

export default reactExample(Example);
