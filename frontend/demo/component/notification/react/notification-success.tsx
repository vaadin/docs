import { reactExample } from 'Frontend/demo/react-example';
import React, { useState } from 'react';
import { Button } from '@hilla/react-components/Button.js';

function Example() {
  const [notificationOpened, setNotificationOpened] = useState(false);

  function handleClick() {
    // tag::snippet[]
    const notification = {
      show: (content: string, options: any) => {
        options.position = 'middle';
      },
      setAttribute: (attribute: string, value: string) => {},
      addEventListener: (event: string, handler: any) => {},
      removeEventListener: (event: string, handler: any) => {},
    };
    notification.show('Application submitted!', {});
    notification.setAttribute('theme', 'success');
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
    <>
      <Button onClick={handleClick} disabled={notificationOpened}>
        Try it
      </Button>
    </>
  );
}

export default reactExample(Example);
