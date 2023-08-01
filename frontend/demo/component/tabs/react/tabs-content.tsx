import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { Tabs, type TabsSelectedChangedEvent } from '@hilla/react-components/Tabs.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { Tab } from '@hilla/react-components/Tab.js';

function Example() {
  const [value, setValue] = useState(0);
  const pages = ['Dashboard', 'Payment', 'Shipping'];

  const selectedChanged = (e: TabsSelectedChangedEvent) => {
    setValue(e.detail.value);
  };

  return (
    <>
      {/* tag::snippet[] */}
      <Tabs selected={value} onSelectedChanged={selectedChanged}>
        <Tab>Dashboard</Tab>
        <Tab>Payment</Tab>
        <Tab>Shipping</Tab>
      </Tabs>

      <VerticalLayout theme="padding">
        <p>{`This is the ${pages[value]} tab`}</p>
      </VerticalLayout>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
