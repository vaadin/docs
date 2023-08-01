import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { Notification } from '@hilla/react-components/Notification.js';

function Example() {
  function handleTextNotification() {
    // tag::snippet[]
    // Show a simple text-based notification
    Notification.show('Financial report generated', {
      position: 'middle',
    });
    // end::snippet[]
  }

  function handleLitTemplateNotification() {
    // tag::snippet[]
    Notification.show(
      `
        <b>@John:</b>
        &nbsp;
        <span>
          How about lunch at
          <span style={{ color: 'var(--lumo-primary-text-color)' }}>12:30pm</span>?
        </span>
      `,
      {
        position: 'middle',
      }
    );
    // end::snippet[]
  }

  return (
    <>
      <Button onClick={handleTextNotification}>Show text notification</Button>
      <Button onClick={handleLitTemplateNotification}>Show notification with markup</Button>
    </>
  );
}

export default reactExample(Example); // hidden-source-line
