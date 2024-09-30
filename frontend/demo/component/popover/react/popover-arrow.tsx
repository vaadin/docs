import '@vaadin/vaadin-lumo-styles/vaadin-iconset.js';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Button, Icon, Popover } from '@vaadin/react-components';

function Example() {
  // tag::snippet[]
  return (
    <>
      <Button id="target" aria-label="Notifications" theme="icon">
        <Icon icon="lumo:bell" />
      </Button>
      <Popover for="target" theme="arrow">
        <div>No new notifications</div>
      </Popover>
    </>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
