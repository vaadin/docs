import React from 'react';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { Button } from '@hilla/react-components/Button.js';
import { Notification } from '@hilla/react-components/Notification.js';
import type { NotificationOpenedChangedEvent } from '@hilla/react-components/Notification.js';
import { useState } from 'react';

function Example() {
  const [notificationOpened, setNotificationOpened] = useState(false);

  const handleClick = () => {
    const notification = Notification.show('New project plan available', {
      position: 'middle',
      theme: 'primary',
    });

    setNotificationOpened(true);

    const handleOpenChanged = (e: NotificationOpenedChangedEvent) => {
      if (!e.detail.value) {
        setNotificationOpened(false);
        notification.removeEventListener('opened-changed', handleOpenChanged);
      }
    };

    notification.addEventListener('opened-changed', handleOpenChanged);
  };

  return (
    <>
      <Button onClick={handleClick} disabled={notificationOpened}>
        Try it
      </Button>
    </>
  );
}

export default reactExample(Example); // hidden-source-line
