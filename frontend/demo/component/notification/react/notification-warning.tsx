import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { Notification } from '@hilla/react-components/Notification.js';
import { Icon } from '@hilla/react-components/Icon.js';
import '@vaadin/icons';

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
        theme="warning"
        duration={0}
        position="top-center"
        opened={notificationOpened}
        onOpenedChanged={(event) => {
          setNotificationOpened(event.detail.value);
        }}
      >
        <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
          <div>
            Your session will expire in 5 minutes due to inactivity.
            <br />
            Close this warning to continue working.
          </div>

          <Button theme="tertiary-inline" onClick={() => setNotificationOpened(false)}>
            <Icon icon="lumo:cross" />
          </Button>
        </HorizontalLayout>
      </Notification>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
