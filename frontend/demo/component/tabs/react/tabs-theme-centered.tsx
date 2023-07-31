import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Tabs } from '@hilla/react-components/Tabs.js';
import { Tab } from '@hilla/react-components/Tab.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <Tabs theme="centered">
        <Tab>Details</Tab>
        <Tab>Payment</Tab>
        <Tab>Shipping</Tab>
      </Tabs>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
