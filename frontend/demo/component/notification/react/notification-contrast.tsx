import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { Button } from '@hilla/react-components/Button.js';
import {
  Notification,
  type NotificationOpenedChangedEvent,
} from '@hilla/react-components/Notification.js';

function Example() {
  const [notificationOpened, setNotificationOpened] = useState(false);

  const handleClick = () => {
    const notification = Notification.show('5 tasks deleted', {
      position: 'middle',
    });
    notification.setAttribute('theme', 'contrast');
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
    <Button onClick={handleClick} disabled={notificationOpened}>
      Try it
    </Button>
  );
}

export default reactExample(Example); // hidden-source-line
