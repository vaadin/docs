import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { Tabsheet } from '@hilla/react-components/Tabsheet.js';

// tag::snippet[]
function Example() {
  return (
    <Tabsheet theme="bordered">
      <Tabsheet.Tabs>
        <Tabsheet.Tab id="dashboard-tab">Dashboard</Tabsheet.Tab>
        <Tabsheet.Tab id="payment-tab">Payment</Tabsheet.Tab>
        <Tabsheet.Tab id="shipping-tab">Shipping</Tabsheet.Tab>
      </Tabsheet.Tabs>

      <Tabsheet.TabItem for="dashboard-tab">This is the Dashboard tab content</Tabsheet.TabItem>

      <Tabsheet.TabItem for="payment-tab">This is the Payment tab content</Tabsheet.TabItem>

      <Tabsheet.TabItem for="shipping-tab">This is the Shipping tab content</Tabsheet.TabItem>
    </Tabsheet>
  );
}

export default reactExample(Example);
// end::snippet[]
