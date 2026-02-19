import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { HorizontalLayout, VerticalLayout } from '@vaadin/react-components';

function Example() {
  return (
    // tag::snippet[]
    <VerticalLayout theme="spacing">
      <HorizontalLayout theme="spacing">
        <span {...{ theme: 'badge ' }}>Pending</span>
        <span {...{ theme: 'badge success ' }}>Confirmed</span>
        <span {...{ theme: 'badge warning ' }}>Warning</span>
        <span {...{ theme: 'badge error ' }}>Denied</span>
        <span {...{ theme: 'badge contrast ' }}>On hold</span>
      </HorizontalLayout>
      <HorizontalLayout theme="spacing">
        <span {...{ theme: 'badge primary ' }}>Pending</span>
        <span {...{ theme: 'badge success primary ' }}>Confirmed</span>
        <span {...{ theme: 'badge warning primary ' }}>Warning</span>
        <span {...{ theme: 'badge error primary ' }}>Denied</span>
        <span {...{ theme: 'badge contrast primary ' }}>On hold</span>
      </HorizontalLayout>
    </VerticalLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
