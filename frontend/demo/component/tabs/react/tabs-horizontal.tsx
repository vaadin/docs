import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Tabs } from '@hilla/react-components/Tabs.js';
import { Tab } from '@hilla/react-components/Tab.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <Tabs style={{ maxWidth: '100%', width: '400px' }}>
        <Tab>Analytics</Tab>
        <Tab>Customers</Tab>
        <Tab>Dashboards</Tab>
        <Tab>Documents</Tab>
        <Tab>Orders</Tab>
      </Tabs>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
