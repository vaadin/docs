import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { Button } from '@vaadin/react-components/Button.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Notification } from '@vaadin/react-components/Notification.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset';

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
        theme="error"
        duration={0}
        position="middle"
        opened={notificationOpened.value}
        onOpenedChanged={(e) => {
          notificationOpened.value = e.detail.value;
        }}
      >
        <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
          <div>Failed to generate report</div>
          <Button
            theme="tertiary-inline"
            onClick={() => {
              notificationOpened.value = false;
            }}
            aria-label="Close"
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
