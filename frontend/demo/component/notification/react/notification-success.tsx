import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { Notification } from '@hilla/react-components/Notification.js';

function Example() {
  const [notificationOpened, setNotificationOpened] = useState(false);

  function handleClick() {
    // tag::snippet[]
    const notification = Notification.show('Application submitted!', {
      position: 'middle',
      theme: 'success',
    });
    // end::snippet[]
    setNotificationOpened(true);
    const handleOpenChanged = (e: { detail: { value: boolean } }) => {
      if (!e.detail.value) {
        setNotificationOpened(false);
        notification.removeEventListener('opened-changed', handleOpenChanged);
      }
    };
    notification.addEventListener('opened-changed', handleOpenChanged);
  }

  return (
    <Button onClick={handleClick} disabled={notificationOpened}>
      Try it
    </Button>
  );
}

export default reactExample(Example); // hidden-source-line
