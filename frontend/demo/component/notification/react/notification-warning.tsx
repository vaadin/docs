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

  return (
    <>
      <Button
        disabled={notificationOpened.value}
        onClick={() => {
          notificationOpened.value = true;
        }}
      >
        Show notification
      </Button>

      {/* tag::snippet[] */}
      {/* The duration is set to 0-sec to prevent the notification from auto-close. */}
      <Notification
        theme="warning"
        duration={0}
        position="middle"
        opened={notificationOpened.value}
        onOpenedChanged={(event) => {
          notificationOpened.value = event.detail.value;
        }}
      >
        <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
          <div>
            Your session will expire in 5 minutes due to inactivity.
            <br />
            Close this warning to continue working.
          </div>

          <Button
            theme="tertiary-inline"
            onClick={() => {
              notificationOpened.value = false;
            }}
          >
            <Icon icon="lumo:cross" />
          </Button>
        </HorizontalLayout>
      </Notification>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
