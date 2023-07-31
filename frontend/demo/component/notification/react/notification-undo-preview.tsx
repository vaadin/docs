import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { NotificationCard } from '@hilla/react-components/NotificationCard.js';
import { Icon } from '@hilla/react-components/Icon.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <NotificationCard theme="contrast" slot="middle">
        <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
          <div>5 tasks deleted</div>
          <Button theme="tertiary-inline" style={{ marginLeft: 'var(--lumo-space-xl)' }}>
            Undo
          </Button>
          <Button theme="tertiary-inline" aria-label="Close">
            <Icon icon="lumo:cross" />
          </Button>
        </HorizontalLayout>
      </NotificationCard>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
