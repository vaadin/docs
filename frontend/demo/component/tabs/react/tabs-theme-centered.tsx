import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Tab } from '@vaadin/react-components/Tab.js';
import { Tabs } from '@vaadin/react-components/Tabs.js';

function Example() {
  return (
    // tag::snippet[]
    <Tabs theme="centered">
      <Tab>Details</Tab>
      <Tab>Payment</Tab>
      <Tab>Shipping</Tab>
    </Tabs>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
