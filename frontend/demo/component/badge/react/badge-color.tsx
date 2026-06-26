import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Badge, HorizontalLayout, VerticalLayout } from '@vaadin/react-components';

function Example() {
  return (
    // tag::snippet[]
    <VerticalLayout theme="spacing">
      <HorizontalLayout theme="spacing">
        <Badge>Pending</Badge>
        <Badge theme="success">Confirmed</Badge>
        <Badge theme="warning">Warning</Badge>
        <Badge theme="error">Denied</Badge>
      </HorizontalLayout>
      <HorizontalLayout theme="spacing">
        <Badge theme="filled">Pending</Badge>
        <Badge theme="success filled">Confirmed</Badge>
        <Badge theme="warning filled">Warning</Badge>
        <Badge theme="error filled">Denied</Badge>
      </HorizontalLayout>
    </VerticalLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
