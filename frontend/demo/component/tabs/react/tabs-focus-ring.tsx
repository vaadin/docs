import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { Tabs } from '@hilla/react-components/Tabs.js';
import { Tab } from '@hilla/react-components/Tab.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <Tabs>
        <Tab>
          <span focus-ring>Details</span>
        </Tab>
        <Tab>Payment</Tab>
        <Tab>Shipping</Tab>
      </Tabs>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
