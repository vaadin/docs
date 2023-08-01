import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { TabSheet } from '@hilla/react-components/TabSheet.js';
import { Tabs } from '@hilla/react-components/Tabs.js';
import { Tab } from '@hilla/react-components/Tab.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <TabSheet>
        <Button slot="prefix">Close all</Button>

        <Button slot="suffix" theme="icon" aria-label="Add tab">
          <Icon icon="vaadin:plus"></Icon>
        </Button>

        <Tabs slot="tabs">
          <Tab id="dashboard-tab">Dashboard</Tab>
          <Tab id="payment-tab">Payment</Tab>
          <Tab id="shipping-tab">Shipping</Tab>
        </Tabs>

        <div {...{ for: 'dashboard-tab' }}>This is the Dashboard tab content</div>
        <div {...{ for: 'payment-tab' }}>This is the Payment tab content</div>
        <div {...{ for: 'shipping-tab' }}>This is the Shipping tab content</div>
      </TabSheet>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
