import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Button } from '@vaadin/react-components/Button.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Notification } from '@vaadin/react-components/Notification.js';

function Example() {
  useSignals(); // hidden-source-line
  const notificationOpened = useSignal(true);
  const isMac = /Macintosh|MacIntel|MacPPC|Mac68K/.test(window.navigator.platform);

  const open = () => {
    notificationOpened.value = true;
  };

  const close = () => {
    notificationOpened.value = false;
  };

  // tag::snippet[]
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (notificationOpened.value && (event.metaKey || event.ctrlKey) && event.key === 'z') {
        event.preventDefault();
        close();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [notificationOpened.value]);

  return (
    <>
      <Button disabled={notificationOpened.value} onClick={open}>
        Show notification
      </Button>

      <Notification
        theme="contrast"
        duration={10000}
        position="middle"
        opened={notificationOpened.value}
        onClosed={() => {
          notificationOpened.value = false;
        }}
      >
        <HorizontalLayout style={{ alignItems: 'center' }}>
          <div>5 tasks deleted</div>
          <Button style={{ marginLeft: '2.5rem' }} theme="primary" onClick={close}>
            Undo
            {isMac ? '⌘' : 'Ctrl-'}Z
          </Button>
        </HorizontalLayout>
      </Notification>
    </>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
