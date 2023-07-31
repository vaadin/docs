import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { NotificationCard } from '@hilla/react-components/NotificationCard.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { Button } from '@hilla/react-components/Button.js';
import { Icon } from '@hilla/react-components/Icon.js';

function Example() {
  return (
    <NotificationCard theme="error">
      <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
        <div>Failed to generate report</div>
        <Button theme="tertiary-inline" style={{ marginLeft: 'var(--lumo-space-xl)' }}>
          Retry
        </Button>
        <Button theme="tertiary-inline" aria-label="Close">
          <Icon icon="lumo:cross" />
        </Button>
      </HorizontalLayout>
    </NotificationCard>
  );
}

export default reactExample(Example);
