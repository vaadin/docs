import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect, useState } from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { Notification } from '@hilla/react-components/Notification.js';

function Example() {
  const [notificationOpened, setNotificationOpened] = useState(false);
  const [isMac, setIsMac] = useState(
    /Macintosh|MacIntel|MacPPC|Mac68K/.test(window.navigator.platform)
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (notificationOpened && (event.metaKey || event.ctrlKey) && event.key === 'z') {
        event.preventDefault();
        close();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [notificationOpened]);

  const open = () => {
    setNotificationOpened(true);
  };

  const close = () => {
    setNotificationOpened(false);
  };

  const renderer = () => (
    <HorizontalLayout style={{ alignItems: 'center' }}>
      <div>5 tasks deleted</div>
      <Button style={{ marginLeft: 'var(--lumo-space-xl)' }} theme="primary" onClick={close}>
        Undo
        {isMac ? '⌘' : 'Ctrl-'}Z
      </Button>
    </HorizontalLayout>
  );

  return (
    <>
      <Button disabled={notificationOpened} onClick={open}>
        Try it
      </Button>

      <Notification
        theme="contrast"
        duration={10000}
        position="middle"
        opened={notificationOpened}
        onOpenedChanged={(e) => setNotificationOpened(e.detail.value)}
      >
        {renderer}
      </Notification>
    </>
  );
}

export default reactExample(Example);
