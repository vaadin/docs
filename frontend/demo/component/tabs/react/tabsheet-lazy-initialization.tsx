import { reactExample } from 'Frontend/demo/react-example';
import React, { useState } from 'react';
import { Tabs, Tab } from '@hilla/react-components/Tabs.js';

function Example() {
  const [visitedTabs, setVisitedTabs] = useState<Set<number>>(new Set<number>());

  const selectedTabChanged = (event: any) => {
    setVisitedTabs(new Set([...visitedTabs, event.detail.value]));
  };

  return (
    <>
      {/* tag::snippet[] */}
      <Tabs onSelectedChanged={selectedTabChanged}>
        <Tab key="dashboard-tab" id="dashboard-tab" label="Dashboard" />
        <Tab key="payment-tab" id="payment-tab" label="Payment" />
        <Tab key="shipping-tab" id="shipping-tab" label="Shipping" />
      </Tabs>

      {visitedTabs.has(0) ? <div tab="dashboard-tab">This is the Dashboard tab content</div> : null}
      {visitedTabs.has(1) ? <div tab="payment-tab">This is the Payment tab content</div> : null}
      {visitedTabs.has(2) ? <div tab="shipping-tab">This is the Shipping tab content</div> : null}
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
