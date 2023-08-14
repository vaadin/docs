import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Tabs } from '@hilla/react-components/Tabs.js';
import { Tab } from '@hilla/react-components/Tab.js';

function Example() {
  return (
    <Tabs>
      <Tab {...{ 'focus-ring': '' }}>Details</Tab>
      <Tab>Payment</Tab>
      <Tab>Shipping</Tab>
    </Tabs>
  );
}

export default reactExample(Example); // hidden-source-line
