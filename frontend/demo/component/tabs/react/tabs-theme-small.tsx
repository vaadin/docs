import React from 'react';
import { Tab } from '@vaadin/react-components/Tab.js';
import { Tabs } from '@vaadin/react-components/Tabs.js';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line

function Example() {
  return (
    // tag::snippet[]
    <Tabs theme="small">
      <Tab>Details</Tab>
      <Tab>Payment</Tab>
      <Tab>Shipping</Tab>
    </Tabs>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
