import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { Notification } from '@hilla/react-components/Notification.js';

function Example() {
  const [notificationOpened, setNotificationOpened] = useState(false);

  const open = () => {
    setNotificationOpened(true);
  };

  const close = () => {
    setNotificationOpened(false);
  };

  return (
    <>
      <Button disabled={notificationOpened} onClick={open}>
        Try it
      </Button>

      {/* tag::snippet[] */}
      {/* The duration is set to 0-sec to prevent the notification from auto-close. */}
      <Notification
        theme="error"
        duration={0}
        position="middle"
        opened={notificationOpened}
        onOpenedChanged={(e) => setNotificationOpened(e.detail.value)}
      >
        <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
          <div>Failed to generate report</div>
          <Button
            theme="tertiary-inline"
            style={{ marginLeft: 'var(--lumo-space-xl)' }}
            onClick={close}
          >
            Retry
          </Button>
          <Button theme="tertiary-inline icon" onClick={close} aria-label="Close">
            <Icon icon="lumo:cross" />
          </Button>
        </HorizontalLayout>
      </Notification>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
