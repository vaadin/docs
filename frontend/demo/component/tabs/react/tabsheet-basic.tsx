import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { Tabsheet } from '@hilla/react-components/Tabsheet.js';
import { Tabs } from '@hilla/react-components/Tabs.js';
import { Tab } from '@hilla/react-components/Tab.js';

function Example() {
  return (
    <Tabsheet>
      <Tabs slot="tabs">
        <Tab id="dashboard-tab">Dashboard</Tab>
        <Tab id="payment-tab">Payment</Tab>
        <Tab id="shipping-tab">Shipping</Tab>
      </Tabs>

      {/* tag::snippet[] */}
      <div tab="dashboard-tab">This is the Dashboard tab content</div>
      <div tab="payment-tab">This is the Payment tab content</div>
      <div tab="shipping-tab">This is the Shipping tab content</div>
      {/* end::snippet[] */}
    </Tabsheet>
  );
}

export default reactExample(Example);
