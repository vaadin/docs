import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import {
  MessageInput,
  type MessageInputSubmitEvent,
} from '@hilla/react-components/MessageInput.js';
import { Notification } from '@hilla/react-components/Notification.js';

function Example() {
  // tag::snippet[]
  function handleSubmit(event: MessageInputSubmitEvent) {
    const message = event.detail.value;
    Notification.show(`Message received: ${message}`, { position: 'middle' });
  }

  return <MessageInput onSubmit={handleSubmit} />;
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
