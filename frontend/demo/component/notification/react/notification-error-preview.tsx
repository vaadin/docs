import React from 'react';
import { NotificationCard } from '@hilla/react-components/NotificationCard.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { Button } from '@hilla/react-components/Button.js';
import { Icon } from '@hilla/react-components/Icon.js';

function Example() {
  return (
    <NotificationCard theme="error" slot="middle">
      <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
        <div>Failed to generate report</div>
        <Button theme="tertiary-inline">
          <Icon icon="lumo:cross" />
        </Button>
      </HorizontalLayout>
    </NotificationCard>
  );
}

export default Example;
