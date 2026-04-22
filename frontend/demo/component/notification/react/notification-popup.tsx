import '@vaadin/vaadin-lumo-styles/vaadin-iconset.js';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Badge, Button, Icon, Popover } from '@vaadin/react-components';

function Example() {
  return (
    // tag::snippet[]
    <>
      <Button id="target" aria-label="notifications" theme="tertiary icon">
        <Icon icon="lumo:bell" />
        <Badge
          number={4}
          theme="error filled"
          style={{ position: 'absolute', transform: 'translate(-40%, -30%)' }}
        />
      </Button>
      <Popover for="target">
        <div>Show notifications here</div>
      </Popover>
    </>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
