import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { Tabs } from '@hilla/react-components/Tabs.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <Tabs theme="hide-scroll-buttons" style={{ maxWidth: '100%', width: '400px' }}>
        <Tabs.Tab>Analytics</Tabs.Tab>
        <Tabs.Tab>Customers</Tabs.Tab>
        <Tabs.Tab>Dashboards</Tabs.Tab>
        <Tabs.Tab>Documents</Tabs.Tab>
        <Tabs.Tab>Orders</Tabs.Tab>
        <Tabs.Tab>Products</Tabs.Tab>
        <Tabs.Tab>Tasks</Tabs.Tab>
      </Tabs>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
