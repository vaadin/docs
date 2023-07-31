import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { NotificationCard } from '@hilla/react-components/NotificationCard.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { Button } from '@hilla/react-components/Button.js';
import { Avatar } from '@hilla/react-components/Avatar.js';

function Example() {
  return (
    <>
      <NotificationCard theme="success" slot="middle">
        <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
          <Icon icon="vaadin:check-circle" />
          <div>Application submitted!</div>
          <Button style={{ margin: '0 0 0 var(--lumo-space-l)' }}>View</Button>
          <Button theme="tertiary-inline">
            <Icon icon="lumo:cross" />
          </Button>
        </HorizontalLayout>
      </NotificationCard>

      <NotificationCard theme="error" slot="middle">
        <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
          <Icon icon="vaadin:warning" />
          <div>Failed to generate report</div>
          <Button style={{ margin: '0 0 0 var(--lumo-space-l)' }}>Retry</Button>
          <Button theme="tertiary-inline">
            <Icon icon="lumo:cross" />
          </Button>
        </HorizontalLayout>
      </NotificationCard>

      <NotificationCard slot="middle">
        <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
          <Avatar name="Jason Bailey" />
          <div>
            <b>Jason Bailey</b> mentioned you in <a href="#">Project Q4</a>
          </div>
          <Button theme="tertiary-inline">
            <Icon icon="lumo:cross" />
          </Button>
        </HorizontalLayout>
      </NotificationCard>

      <NotificationCard slot="middle">
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
          <Button theme="tertiary-inline">
            <Icon icon="lumo:cross" />
          </Button>
        </HorizontalLayout>
      </NotificationCard>
    </>
  );
}

export default reactExample(Example);
