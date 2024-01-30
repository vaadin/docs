import React, { useState } from 'react';
import { Button } from '@vaadin/react-components/Button.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import { Notification } from '@vaadin/react-components/Notification.js';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import '@vaadin/vaadin-lumo-styles/vaadin-iconset';

function Example() {
  const [notificationOpened, setNotificationOpened] = useState(true);

  function open() {
    setNotificationOpened(true);
  }

  function close() {
    setNotificationOpened(false);
  }

  return (
    <>
      <Button disabled={notificationOpened} onClick={open}>
        Show notification
      </Button>

      {/* tag::snippet[] */}
      <Notification
        theme="contrast"
        duration={10000}
        position="middle"
        opened={notificationOpened}
        onOpenedChanged={(event) => {
          setNotificationOpened(event.detail.value);
        }}
      >
        {() => (
          <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
            <div>5 tasks deleted</div>
            <Button
              theme="tertiary-inline"
              style={{ marginLeft: 'var(--lumo-space-xl)' }}
              onClick={close}
            >
              Undo
            </Button>

            <Button theme="tertiary-inline" aria-label="Close" onClick={close}>
              <Icon icon="lumo:cross" />
            </Button>
          </HorizontalLayout>
        )}
      </Notification>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
