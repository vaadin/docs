import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Badge, HorizontalLayout, Icon } from '@vaadin/react-components';

function Example() {
  return (
    // tag::snippet[]
    <HorizontalLayout theme="spacing">
      <Badge>
        <Icon icon="vaadin:clock" slot="icon" />
        Pending
      </Badge>
      <Badge theme="success">
        <Icon icon="vaadin:check" slot="icon" />
        Confirmed
      </Badge>
      <Badge theme="warning">
        <Icon icon="vaadin:warning" slot="icon" />
        Warning
      </Badge>
      <Badge theme="error">
        <Icon icon="vaadin:exclamation-circle-o" slot="icon" />
        Denied
      </Badge>
    </HorizontalLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
