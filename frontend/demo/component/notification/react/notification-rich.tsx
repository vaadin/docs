import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Notification, type NotificationElement } from '@hilla/react-components/Notification.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { Button } from '@hilla/react-components/Button.js';
import { Avatar } from '@hilla/react-components/Avatar.js';
import '@vaadin/icons';

function Example() {
  function open(event: React.MouseEvent) {
    const target = event.target as HTMLElement;
    const notification =
      document.querySelectorAll<NotificationElement>('h-notification')[
        Number(target.dataset.which) - 1
      ];
    notification?.open();
  }

  return (
    <>
      {/* tag::snippet[] */}
      <Notification theme="success" position="middle">
        <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
          <Icon icon="vaadin:check-circle" />
          <div>Application submitted!</div>
          <Button style={{ margin: '0 0 0 var(--lumo-space-l)' }} onClick={close}>
            View
          </Button>
          <Button theme="tertiary-inline" onClick={close} aria-label="Close">
            <Icon icon="lumo:cross" />
          </Button>
        </HorizontalLayout>
      </Notification>

      <Notification theme="error" position="middle">
        <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
          <Icon icon="vaadin:warning" />
          <div>Failed to generate report</div>
          <Button style={{ margin: '0 0 0 var(--lumo-space-l)' }} onClick={close}>
            Retry
          </Button>
          <Button theme="tertiary-inline" onClick={close} aria-label="Close">
            <Icon icon="lumo:cross" />
          </Button>
        </HorizontalLayout>
      </Notification>

      <Notification position="middle">
        <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
          <Avatar name="Jason Bailey" />
          <div>
            <b>Jason Bailey</b> mentioned you in <a href="#">Project Q4</a>
          </div>
          <Button theme="tertiary-inline" onClick={close} aria-label="Close">
            <Icon icon="lumo:cross" />
          </Button>
        </HorizontalLayout>
      </Notification>

      <Notification position="middle">
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
          <Button theme="tertiary-inline" onClick={close} aria-label="Close">
            <Icon icon="lumo:cross" />
          </Button>
        </HorizontalLayout>
      </Notification>
      {/* end::snippet[] */}

      <HorizontalLayout theme="spacing" style={{ justifyContent: 'center' }}>
        <Button onClick={open} data-which="1" theme="success primary">
          Try it
        </Button>
        <Button onClick={open} data-which="2" theme="error primary">
          Try it
        </Button>
        <Button onClick={open} data-which="3" theme="contrast">
          Try it
        </Button>
        <Button onClick={open} data-which="4" theme="success">
          Try it
        </Button>
      </HorizontalLayout>
    </>
  );
}

export default reactExample(Example); // hidden-source-line
