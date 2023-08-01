import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Tabs } from '@hilla/react-components/Tabs.js';
import { Tab } from '@hilla/react-components/Tab.js';

export function Example() {
  return (
    <>
      <Tabs orientation="vertical" style={{ height: '240px', width: '240px' }}>
        <Tab>Analytics</Tab>
        <Tab>Customers</Tab>
        <Tab>Dashboards</Tab>
        <Tab>Documents</Tab>
        <Tab>Orders</Tab>
        <Tab>Products</Tab>
        <Tab>Tasks</Tab>
      </Tabs>
    </>
  );
}

export default reactExample(Example); // hidden-source-line
