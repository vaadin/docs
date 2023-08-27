import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { Notification } from '@hilla/react-components/Notification.js';
import '@vaadin/icons';

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
        duration={0}
        position="middle"
        opened={notificationOpened}
        onOpenedChanged={({ detail: { value } }) => setNotificationOpened(value)}
      >
        <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
          <div>
            Jason Bailey mentioned you in <a href="#">Project Q4</a>
          </div>

          <Button theme="tertiary-inline" aria-label="Close" onClick={close}>
            <Icon icon="lumo:cross" />
          </Button>
        </HorizontalLayout>
      </Notification>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
