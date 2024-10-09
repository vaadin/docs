import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Tab } from '@vaadin/react-components/Tab.js';
import { Tabs } from '@vaadin/react-components/Tabs.js';

function Example() {
  return (
    // tag::snippet[]
    <Tabs orientation="vertical" style={{ height: '240px', width: '240px' }}>
      <Tab>Analytics</Tab>
      <Tab>Customers</Tab>
      <Tab>Dashboards</Tab>
      <Tab>Documents</Tab>
      <Tab>Orders</Tab>
      <Tab>Products</Tab>
      <Tab>Tasks</Tab>
    </Tabs>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
