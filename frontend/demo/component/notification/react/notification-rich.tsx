import '@vaadin/icons';
import '@vaadin/vaadin-lumo-styles/icons.js';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { Avatar } from '@vaadin/react-components/Avatar.js';
import { Button } from '@vaadin/react-components/Button.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import { Notification } from '@vaadin/react-components/Notification.js';

function Example() {
  useSignals(); // hidden-source-line

  return (
    <>
      {/* tag::snippet[] */}
      {/* The duration is set to 0-sec to prevent the notification from auto-close. */}
      <Notification duration={0} theme="success" position="middle" opened>
        <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
          <Icon icon="vaadin:check-circle" />
          <div>Application submitted!</div>
          <Button style={{ margin: '0 0 0 var(--lumo-space-l)' }}>View</Button>
          <Button theme="tertiary-inline" aria-label="Close">
            <Icon icon="lumo:cross" />
          </Button>
        </HorizontalLayout>
      </Notification>

      <Notification duration={0} theme="error" position="middle" opened>
        <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
          <Icon icon="vaadin:warning" />
          <div>Failed to generate report</div>
          <Button style={{ margin: '0 0 0 var(--lumo-space-l)' }}>Retry</Button>
          <Button theme="tertiary-inline" aria-label="Close">
            <Icon icon="lumo:cross" />
          </Button>
        </HorizontalLayout>
      </Notification>

      <Notification duration={0} position="middle" opened>
        <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
          <Avatar name="Jason Bailey" />
          <div>
            <b>Jason Bailey</b> mentioned you in <a href="#">Project Q4</a>
          </div>
          <Button theme="tertiary-inline" aria-label="Close">
            <Icon icon="lumo:cross" />
          </Button>
        </HorizontalLayout>
      </Notification>

      <Notification duration={0} position="middle" opened>
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
          <Button theme="tertiary-inline" aria-label="Close">
            <Icon icon="lumo:cross" />
          </Button>
        </HorizontalLayout>
      </Notification>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
