import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { NotificationCard } from '@hilla/react-components/NotificationCard.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { Button } from '@hilla/react-components/Button.js';
import { Icon } from '@hilla/react-components/Icon.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <NotificationCard theme="warning" slot="middle">
        <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
          <div>
            Your session will expire in 5 minutes due to inactivity.
            <br />
            Close this warning to continue working.
          </div>
          <Button theme="tertiary-inline">
            <Icon icon="lumo:cross" />
          </Button>
        </HorizontalLayout>
      </NotificationCard>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
