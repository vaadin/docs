import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Button } from '@vaadin/react-components/Button.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Icon } from '@vaadin/react-components/Icon.js';

function Example() {
  return (
    <HorizontalLayout theme="spacing" style={{ alignItems: 'center' }}>
      {/* // tag::snippet[] */}
      <Icon icon="vaadin:phone" />
      <Icon icon="vaadin:calendar" />
      <Icon icon="vaadin:alarm" />
      <Button theme="icon">
        <Icon icon="vaadin:bell" />
      </Button>
      {/* // end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
