import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { Tabs, Tab } from '@hilla/react-components/Tabs.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <Tabs>
        <Tab>Details</Tab>
        <Tab>Payment</Tab>
        <Tab>Shipping</Tab>
      </Tabs>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
