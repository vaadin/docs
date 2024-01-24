import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { Button } from '@vaadin/react-components/Button.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Notification } from '@vaadin/react-components/Notification.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset';

function Example() {
  const [notificationOpened, setNotificationOpened] = useState(true);

  return (
    <>
      <Button disabled={notificationOpened} onClick={() => setNotificationOpened(true)}>
        Show notification
      </Button>

      {/* tag::snippet[] */}
      {/* The duration is set to 0-sec to prevent the notification from auto-close. */}
      <Notification
        theme="warning"
        duration={0}
        position="middle"
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
