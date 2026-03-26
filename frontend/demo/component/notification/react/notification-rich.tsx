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
        <HorizontalLayout theme="spacing" style={{ alignItems: 'center', minWidth: '350px' }}>
          <Icon icon="vaadin:check-circle" />
          <div>Application submitted!</div>
          <Button slot="end">View</Button>
          <Button slot="end" theme="icon" aria-label="Close">
            <Icon icon="lumo:cross" />
          </Button>
        </HorizontalLayout>
      </Notification>

      <Notification duration={0} theme="error" position="middle" opened>
        <HorizontalLayout theme="spacing" style={{ alignItems: 'center', minWidth: '350px' }}>
          <Icon icon="vaadin:warning" />
          <div>Failed to generate report</div>
          <Button slot="end">Retry</Button>
          <Button slot="end" theme="icon" aria-label="Close">
            <Icon icon="lumo:cross" />
          </Button>
        </HorizontalLayout>
      </Notification>

      <Notification duration={0} position="middle" opened>
        <HorizontalLayout theme="spacing" style={{ alignItems: 'center', minWidth: '350px' }}>
          <Avatar name="Jason Bailey" />
          <div>
            <b>Jason Bailey</b> mentioned you in <a href="#">Project Q4</a>
          </div>
          <Button slot="end" theme="icon" aria-label="Close">
            <Icon icon="lumo:cross" />
          </Button>
        </HorizontalLayout>
      </Notification>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
