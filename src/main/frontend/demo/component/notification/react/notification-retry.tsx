import '@vaadin/vaadin-lumo-styles/vaadin-iconset';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Button } from '@vaadin/react-components/Button.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import { Notification } from '@vaadin/react-components/Notification.js';

function Example() {
  useSignals(); // hidden-source-line
  const notificationOpened = useSignal(true);

  const open = () => {
    notificationOpened.value = true;
  };

  const close = () => {
    notificationOpened.value = false;
  };

  return (
    <>
      <Button disabled={notificationOpened.value} onClick={open}>
        Show notification
      </Button>

      {/* tag::snippet[] */}
      {/* The duration is set to 0-sec to prevent the notification from auto-close. */}
      <Notification
        theme="error"
        duration={0}
        position="middle"
        opened={notificationOpened.value}
        onClosed={() => {
          notificationOpened.value = false;
        }}
      >
        <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
          <div>Failed to generate report</div>
          <Button
            theme="tertiary-inline"
            style={{ marginLeft: 'var(--lumo-space-xl)' }}
            onClick={close}
          >
            Retry
          </Button>

          <Button theme="tertiary-inline icon" onClick={close} aria-label="Close">
            <Icon icon="lumo:cross" />
          </Button>
        </HorizontalLayout>
      </Notification>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
