import { reactExample } from 'Frontend/demo/react-example';
import React, { useState } from 'react';
import { TabSheet, type TabSheetSelectedChangedEvent } from '@hilla/react-components/TabSheet.js';
import { Tabs } from '@hilla/react-components/Tabs.js';
import { Tab } from '@hilla/react-components/Tab.js';

function Example() {
  // tag::snippet[]
  const [visitedTabs, setVisitedTabs] = useState(new Set<number>([0]));

  const selectedTabChanged = (event: TabSheetSelectedChangedEvent) => {
    setVisitedTabs(new Set([...visitedTabs, event.detail.value]));
  };

  return (
    <TabSheet onSelectedChanged={selectedTabChanged}>
      <Tabs slot="tabs">
        <Tab id="dashboard-tab">Dashboard</Tab>
        <Tab id="payment-tab">Payment</Tab>
        <Tab id="shipping-tab">Shipping</Tab>
      </Tabs>

      {visitedTabs.has(0) && (
        <div {...{ tab: 'dashboard-tab' }}>This is the Dashboard tab content</div>
      )}
      {visitedTabs.has(1) && <div {...{ tab: 'payment-tab' }}>This is the Payment tab content</div>}
      {visitedTabs.has(2) && (
        <div {...{ tab: 'shipping-tab' }}>This is the Shipping tab content</div>
      )}
    </TabSheet>
  );
  // tag::snippet[]
}

export default reactExample(Example);
