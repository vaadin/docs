import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Checkbox } from '@vaadin/react-components/Checkbox.js';
import {
  MessageInput,
  type MessageInputSubmitEvent,
} from '@vaadin/react-components/MessageInput.js';
import { Notification } from '@vaadin/react-components/Notification.js';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';

function Example() {
  useSignals(); // hidden-source-line
  // tag::snippet[]
  const submitDisabled = useSignal(true);

  function handleSubmit(event: MessageInputSubmitEvent) {
    Notification.show(`Message received: ${event.detail.value}`, {
      position: 'middle',
      duration: 3000,
    });
  }

  return (
    <VerticalLayout theme="spacing" style={{ alignItems: 'stretch' }}>
      <MessageInput submitDisabled={submitDisabled.value} onSubmit={handleSubmit} />

      <Checkbox
        label="Submit disabled"
        checked={submitDisabled.value}
        onCheckedChanged={(event) => {
          submitDisabled.value = event.detail.value;
        }}
      />
    </VerticalLayout>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
