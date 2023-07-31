import { reactExample } from 'Frontend/demo/react-example';
import React, { useState } from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { Iconset } from '@hilla/react-components/Iconset.js';
import { Notification } from '@hilla/react-components/Notification.js';

function Example() {
  const [notificationOpened, setNotificationOpened] = useState(false);

  return (
    <>
      <Button disabled={notificationOpened} onClick={() => setNotificationOpened(true)}>
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
            onClick={() => setNotificationOpened(false)}
            aria-label="Close"
          >
            <Iconset icon="lumo:cross" />
          </Button>
        </HorizontalLayout>
      </Notification>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
