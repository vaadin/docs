import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Avatar } from '@vaadin/react-components/Avatar.js';
import { Button } from '@vaadin/react-components/Button.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import { Notification } from '@vaadin/react-components/Notification.js';

function Example() {
  useSignals(); // hidden-source-line
  const openedNotifications = useSignal<number[]>([]);

  function open(index: number) {
    openedNotifications.value = [...openedNotifications.value, index];
  }

  function close(index: number) {
    openedNotifications.value = openedNotifications.value.filter((n) => n !== index);
  }

  return (
    <>
      {/* tag::snippet[] */}
      <Notification
        theme="success"
        position="middle"
        opened={openedNotifications.value.includes(0)}
        onClosed={() => {
          close(0);
        }}
      >
        <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
          <Icon icon="vaadin:check-circle" />
          <div>Application submitted!</div>
          <Button style={{ margin: '0 0 0 var(--lumo-space-l)' }} onClick={() => close(0)}>
            View
          </Button>
          <Button theme="tertiary-inline" onClick={() => close(0)} aria-label="Close">
            <Icon icon="lumo:cross" />
          </Button>
        </HorizontalLayout>
      </Notification>

      <Notification
        theme="error"
        position="middle"
        opened={openedNotifications.value.includes(1)}
        onClosed={() => {
          close(1);
        }}
      >
        <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
          <Icon icon="vaadin:warning" />
          <div>Failed to generate report</div>
          <Button style={{ margin: '0 0 0 var(--lumo-space-l)' }} onClick={() => close(1)}>
            Retry
          </Button>
          <Button theme="tertiary-inline" onClick={() => close(1)} aria-label="Close">
            <Icon icon="lumo:cross" />
          </Button>
        </HorizontalLayout>
      </Notification>

      <Notification
        position="middle"
        opened={openedNotifications.value.includes(2)}
        onClosed={() => {
          close(2);
        }}
      >
        <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
          <Avatar name="Jason Bailey" />
          <div>
            <b>Jason Bailey</b> mentioned you in <a href="#">Project Q4</a>
          </div>
          <Button theme="tertiary-inline" onClick={() => close(2)} aria-label="Close">
            <Icon icon="lumo:cross" />
          </Button>
        </HorizontalLayout>
      </Notification>

      <Notification
        position="middle"
        opened={openedNotifications.value.includes(3)}
        onClosed={() => {
          close(3);
        }}
      >
        <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
          <Icon icon="vaadin:check-circle" style={{ color: 'var(--lumo-success-color)' }} />
          <div>
            <b style={{ color: 'var(--lumo-success-text-color)' }}>Upload successful</b>
            <div
              style={{
                fontSize: 'var(--lumo-font-size-s)',
                color: 'var(--lumo-secondary-text-color)',
              }}
            >
              <b>Financials.xlsx</b> is now available in <a href="#">Documents</a>
            </div>
          </div>
          <Button theme="tertiary-inline" onClick={() => close(3)} aria-label="Close">
            <Icon icon="lumo:cross" />
          </Button>
        </HorizontalLayout>
      </Notification>
      {/* end::snippet[] */}

      <HorizontalLayout theme="spacing" style={{ justifyContent: 'center' }}>
        <Button theme="success primary" onClick={() => open(0)}>
          Try it
        </Button>

        <Button theme="error primary" onClick={() => open(1)}>
          Try it
        </Button>

        <Button theme="contrast" onClick={() => open(2)}>
          Try it
        </Button>

        <Button theme="success" onClick={() => open(3)}>
          Try it
        </Button>
      </HorizontalLayout>
    </>
  );
}

export default reactExample(Example); // hidden-source-line
