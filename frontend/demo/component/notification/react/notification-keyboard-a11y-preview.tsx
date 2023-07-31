import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { NotificationCard } from '@hilla/react-components/NotificationCard.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { Button } from '@hilla/react-components/Button.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <NotificationCard theme="contrast" slot="middle">
        <HorizontalLayout style={{ alignItems: 'center' }}>
          <div>5 tasks deleted</div>
          <Button theme="primary" style={{ marginLeft: 'var(--lumo-space-xl)' }}>
            Undo Ctrl-Z
          </Button>
        </HorizontalLayout>
      </NotificationCard>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
