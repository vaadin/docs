import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { Button } from '@vaadin/react-components/Button.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import { Notification } from '@vaadin/react-components/Notification.js';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset';

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
        duration={0}
        position="middle"
        opened={notificationOpened.value}
        onOpenedChanged={({ detail: { value } }) => {
          notificationOpened.value = value;
        }}
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
